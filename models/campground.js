const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
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
});


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