const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    phone : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : false
    },
    avatar : {
        type : String,
        required : false
    },
    activated : {
        type : Boolean,
        required : false,
        default : false
    }
},
{
    timestamps :true,
    versionKey : false
})

module.exports = mongoose.model('User' , userSchema , 'users'); 