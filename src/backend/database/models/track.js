const mongoose = require('mongoose');


const TrackScheema = new mongoose.Schema({
    date:{
        type:String,
        minlength:5
    },
    income:{
        type:String,
        minlength:3
    },
    amount:{
        type:String,
        minlength:1
    },
    summary:{
        type:String,
        minlength:3
    }
})

const Track = mongoose.model('Track',TrackScheema);
module.exports = Track;