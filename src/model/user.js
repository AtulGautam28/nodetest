const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserModel = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String
    },
    permissionLevel: {
        type: Number
    },
    imageUrl :{
      type:String  
    },
});

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.removeUser = (userId) => {
    console.log('Hello'+userId);
    return this.findOneAndRemove({ _id: userId }).exec();    
};


module.exports = mongoose.model('user', UserModel);