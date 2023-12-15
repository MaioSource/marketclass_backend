// Gettign the Newly created Mongoose Model we just created 
var Booking = require('../models/Booking.model');
var Course = require('../models/Course.model');

// Saving the context of this module inside the _the variable
_this = this

exports.getBookings = async function (params) {

    try {
        var domain = {
            state: params.state,
            course_author: params.userId
         };
        var booking = await Booking.find(domain)
            .populate("course", "title")
        return booking;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Get Booking');
    }
}

exports.createBooking = async function (booking) {

    var newBooking = new Booking({
        name: booking.name,
        email: booking.email,
        created_at: new Date(),
        message: booking.message,
        course: booking.course,
        hours: booking.hours,
        phone: booking.phone
    })

    try {
        var courseObj = await Course.findById(booking.course)
        newBooking.course_author = courseObj.author

        var savedBooking = await newBooking.save();
        return savedBooking;
    } catch (e) {
        console.log(e)    
        throw Error("Error on Create Booking")
    }
}

exports.updateBooking = async function (booking) {
    try {
        var domain = {
            course_author: booking.userId,
            _id: booking._id
         };
        var oldBooking = await Booking.findOne(domain);
    } catch (e) {
        throw Error("Error occured while Finding the Booking")
    }

    if (!oldBooking) {
        throw Error("Error occured while Finding the Booking")
    }
    oldBooking.updated_at = booking.updated_at
    oldBooking.state = booking.state || oldBooking.state;

    try {
        var savedBooking = await oldBooking.save()
        return savedBooking;
    } catch (e) {
        throw Error("And Error occured while updating the Booking" + e);
    }
}

exports.deleteBooking = async function (params) {

    // Try Catch the awaited promise to handle the error 
    try {
        var domain = {
            course_author: params.userId,
            _id: params._id
         };
        var booking = await Booking.findOneAndDelete(domain)
        return booking;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Delete booking');
    }
}