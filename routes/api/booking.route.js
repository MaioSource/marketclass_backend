var express = require('express')
var router = express.Router()
var BookingController = require('../../controllers/booking.controller');
var Authorization = require('../../auth/authorization');

router.post('/', BookingController.createBooking)
router.get('/', Authorization, BookingController.getBookings)
router.put('/:id', Authorization, BookingController.updateBooking)
router.delete('/:id', Authorization, BookingController.deleteBooking)

// Export the Router
module.exports = router;


