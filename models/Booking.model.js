var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    course_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hours: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

BookingSchema.plugin(mongoosePaginate);
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;