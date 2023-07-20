const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose'); 

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    }
});
// just pass in the result of the package that we installed and add on to our schema those passwords that we added + methods
// adds password and username field for us 
UserSchema.plugin(passportLocalMongoose) 

//export the module to the rest of the app 
module.exports = mongoose.model('User', UserSchema);