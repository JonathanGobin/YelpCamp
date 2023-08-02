//process.env.node we have been running in dev. 
// meaning: if we are running in development mode than require the package which 
//is going to take the variables that ive defined in 
//the env file and process them in the env file and we can access them in our other files 
// if(process.env.NODE_ENV !== "production"){ 
//     require('dotenv').config();
// }
require('dotenv').config();
console.log(process.env.SECRET) 
console.log(process.env.API_KEY )  
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash'); // npm install first than we use app.use(flash()) below to use it 
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user');
// const helmet = require('helmet');
const mongoSantize = require('express-mongo-sanitize');
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds'); // requiring the campground route
const reviewRoutes = require('./routes/reviews'); // just requiring the contents of that file 
const { getMaxListeners } = require('process');
const MongoStore = require('connect-mongo');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'; 

// 'mongodb://localhost:27017/yelp-camp' --> dbUrl when deploying to prod 
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express(); // initializes a new express application 
//Once the instance is created, you can start to add functionality to it. 
//The app object has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and more.


//using the routes that are required 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSantize());

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';


const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});


store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})
//setting up sessions and cookies 
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false, // make session deprications go away 
    saveUninitialized: true, // make session deprications go away 
    cookie:{
        //lets our cookies be only accessible through http and not js
        httpOnly: true,
        //says this cookie should only work over https. On deply we only want ppl access over secure connections over https 
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week expiriation date for the cookie 
        maxAge: 1000 * 60 * 60 * 24 * 7 // dont want them to stay logged in forever 
    }
}



app.use(session(sessionConfig))
app.use(flash());
//enabling helmet to use all 11 middlware 
// app.use(helmet({crossOriginEmbedderPolicy:false}));

//refer to docs 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())) // this is telling passport to use the local strategy that we have downloaded


//has to do with how data is store within the session 
passport.serializeUser(User.serializeUser()); // refers to how we store the user in the session (store in session)
passport.deserializeUser(User.deserializeUser()); // refers to how we remove the user in the session (unstore in session)


app.use((req,res,next ) =>{ // on every single request under sucess we are going to have access to it in our locals under the key success
    console.log(req.query);
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes) // there an id in the routes in the path that prefixes all of these routes 

app.get('/', (req, res) => {
    res.render('home')
});

// any page that does not find a route ends up here and returns a 404 (not found error) 
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


// Error hander
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

//app. listen 
const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

//6483dceb10f06f211888aff5