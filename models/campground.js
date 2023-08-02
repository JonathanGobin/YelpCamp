const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

//we use a virtual because is that we dont need to store in model or db and is derived from the model anyway. Just storing the url not the act image 
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
})

const opts = {toJSON: {virtuals: true} }; 

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},opts);


//make another virtual property again for the url, and setup templating 
//can call in our javascript while passing through as JSON 
CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0,100)}...</p>`
})


//this middleware is triggered by the FindByIdAndDelete method that is used
//the middleware that is run when findByIdAndDelete is run would be FindOneAndDelete
// what this function is saying is that any time findByIdAndDelete is called we want this middleware (FindOneAndDelete)
//to do this function 
CampgroundSchema.post('findOneAndDelete', async function (doc) { 
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);