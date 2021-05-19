const mongoose = require('mongoose')
const interviewerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    posts: [{type: mongoose.Schema.ObjectId, ref: "Post"}],
    age: {
        type : Number,
        default: 0 
    },
    city: {
        type : String,
        default: "" 
    },
    

}, {
    timestamps: true
})

module.exports = mongoose.model("Interviewer", interviewerSchema);