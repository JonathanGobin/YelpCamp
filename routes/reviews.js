const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const campgrounds = require('../controllers/campgrounds');
// const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


// const Campground = require('../models/campground');

// router.route('/')
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))


// router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.route('/:id')
//     .get(catchAsync(campgrounds.showCampground))
//     .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
//     .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



// module.exports = router; 
















// ----------------------------------------------

// const express = require('express');
// const router = express.Router({ mergeParams: true });
// const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
// const Campground = require('../models/campground');
// const Review = require('../models/review');
// const reviews = require('../controllers/reviews');
// const ExpressError = require('../utils/ExpressError');
// const catchAsync = require('../utils/catchAsync');

// router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

// module.exports = router;









// COMMENTED OUT CODE FOR FUTURE *REMOVE WHEN COMMITING PLZ*//

// // must include any required things that are used in any of the given functions 
// // This review.js file is going to hold all related things for review so we have to move them all here from the app.js 
// const express = require('express'); // including express 
// const router = express.Router(); // set up a router and then use that router here 


// const Campground = require('../routes/campgrounds');
// const Review = require('../models/review');

// const {reviewSchema } = require('./schemas.js'); // joi schema 


// const ExpressError = require('../utils/ExpressError');
// const catchAsync = require('../utils/catchAsync'); 


// const validateReview = (req,res, next) => {
//     const{error} = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// router.post('/',validateReview,catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     const review = new Review(req.body.review);
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`);
// }))

// router.delete('/:reviewId', catchAsync(async(req,res)=>{ 
//     const{id, reviewId} = req.params; // these destructure the parameters in the path denoted by (:id, :reviewid) 
//     await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}) // remove the reference to this review from the reviews array
//    res.redirect(`/campgrounds/${id}`) // then we delete the entire review 
// }))

// module.exports = router;
