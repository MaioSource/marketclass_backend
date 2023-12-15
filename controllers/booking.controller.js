var BookingService = require('../services/booking.service');


// Saving the context of this module inside the _the variable
_this = this;

exports.getBookings = async function (req, res, next) {
    try {
        var domain = {
            userId: req.userId,
            state: req.query.state ? req.query.state : ['pending', 'accepted', 'rejected']
          };
        var Bookings = await BookingService.getBookings(domain)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Bookings, message: "Succesfully Bookings Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createBooking = async function (req, res, next) {
    var Booking = {
        name: req.body.name,
        email: req.body.email,
        created_at: new Date(),
        message: req.body.message,
        course: req.body.course,
        hours: req.body.hours,
        phone: req.body.phone,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdBooking = await BookingService.createBooking(Booking)
        return res.status(201).json({createdBooking, message: "Succesfully Created Booking"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Booking Creation was Unsuccesfull"})
    }
}

exports.updateBooking = async function (req, res, next) {
    var Booking = {
        state: req.body.state,
        updated_at: new Date(),
        userId: req.userId,
        _id: req.params.id
    }

    try {
        var updatedBooking = await BookingService.updateBooking(Booking)
        return res.status(200).json({status: 200, message: "Succesfully Updated Booking"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.deleteBooking = async function (req, res, next) {
    var Booking = {
        userId: req.userId,
        _id: req.params.id
    }
    try {
        var deletedBooking = await BookingService.deleteBooking(Booking)
        return res.status(200).json({status: 200, message: "Succesfully Deleted Booking"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


    
    
