const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const catchAsync = require('../utils/catchAsync');
// const User = require('../models/user');
// const users = require('../controllers/users');

// router.get('/register', users.renderRegister)

// //this is just making a user however we are not logging them in that a different request
// router.post('/register', catchAsync(users.register));

// router.get('/login', users.renderLogin);

// // passport.authenticate use local stratgey redirect to login if failure and flash a failure message too 
// // if we make it to the login route handler then we know they were authenticated properly
//     // use the storeReturnTo middleware to save the returnTo value from session to res.locals
//     // passport.authenticate logs the user in and clears req.session
//     // Now we can use res.locals.returnTo to redirect the user after login
// //latest version of passport logout() method now requires a callback function passed as an arg**
// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

// router.get('/logout', users.logout)


// module.exports = router; 