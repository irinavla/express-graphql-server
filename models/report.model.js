const mongoose = require('mongoose');
const Schema = mongoose.Schema

const reportSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    userId: {
        type: String
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;