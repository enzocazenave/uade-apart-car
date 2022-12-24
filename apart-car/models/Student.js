const { model, Schema } = require('mongoose');

const StudentSchema = Schema({
    docket: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    toll: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    }
});

module.exports = model('Student', StudentSchema);