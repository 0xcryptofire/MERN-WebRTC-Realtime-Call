const mongoose = require('mongoose');

const refreshSchema = mongoose.Schema({
    token : {
        type : String,
        required : true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},
{
    timestamps :true,
    versionKey : false
})

module.exports = mongoose.model('Refresh' , refreshSchema , 'tokens'); 