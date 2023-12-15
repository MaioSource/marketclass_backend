// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getAuthors = async function () {

    // Try Catch the awaited promise to handle the error 
    try {
        var authors = await User.find({}, {password: 0})
        return authors;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Authors');
    }
}