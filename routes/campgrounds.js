const express = require('express');
    const router = express.Router();
    const campgrounds = require('../controllers/campgrounds');
    const catchAsync = require('../utils/catchAsync');
    const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
    const multer = require('multer');
    const {storage} = require('../cloudinary');
    const upload = multer({storage});
   

//express has a route handler that handles different verbs (better way to org routes)
//aka Handles both post and get request for a given route
const Campground = require('../models/campground');



router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    //malter will parse form data looking for something called image it will treat it as files and if we give diff name the input name should match on the form 
    .post(upload.array('image'), (req,res) => {
        console.log(req.body,req.files);
        res.send('it worked')
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm);
    

router.route('/:id')
    .get( catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor,validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))




router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router; 

