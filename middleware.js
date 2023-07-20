const { campgroundSchema } = require('./schemas.js');
const { reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review'); 


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req,res,next) => {
    const {id} = req.params; //take campground from the url 
    const campground = await Campground.findById(id); // lookup the campground w/ that id 
    //check to see if the current user id whos logged in is equal to the posters authors id 
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'you do not have permission to do that')
        res.redirect(`/campgrounds/${id}`)
    }
    //if we get here that means this person has the permission to change the campground
    next(); 
}

module.exports.isReviewAuthor = async (req,res,next) => {
    const {id ,reviewId} = req.params; //take campground from the url 
    const review = await Review.findById(reviewId); // lookup the campground w/ that id 
    //check to see if the current user id whos logged in is equal to the posters authors id 
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'you do not have permission to do that')
        res.redirect(`/campgrounds/${id}`)
    }
    //if we get here that means this person has the permission to change the campground
    next(); 
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// module.exports.isLoggedIn = (req,res,next) => {
//     console.log("REQ.USER...", req.user); // will be auto filled in with deserialized information from the session
//     if(!req.isAuthenticated()){
//         //store the url they are requsting 
//         req.session.returnTo = req.originalUrl;
//         req.flash('error', 'You must be logged in first!');
//         return res.redirect('/login')
//     }
//     next();
// }

// //req.user has information about the user from passport 