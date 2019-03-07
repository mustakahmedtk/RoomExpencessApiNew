const mongoose = require('mongoose');


const expencessSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    room_id: {
        type: String,
        required: true
    }

})

module.exports = expences = mongoose.model('expence', expencessSchema)