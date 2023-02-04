const mongoose = require('mongoose');
const blogSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdBy:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Blog',blogSchema);