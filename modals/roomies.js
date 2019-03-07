const mongoose = require('mongoose');


const roomieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Number,
        required: true
    },
    room_id: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    }
})

module.exports = Roomie = mongoose.model('roomie', roomieSchema)