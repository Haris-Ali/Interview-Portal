const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'Interviewer' },
    title: {
        type : String,
        default: "" 
    },
    salary: {
        type : Number,
        default: 0 
    },
    job_description: {
        type : String,
        default: "" 
    },
    workhours:{
        type : Number,
        default: 0 
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema);