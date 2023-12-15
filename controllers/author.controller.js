var AuthorService = require('../services/author.service');


// Saving the context of this module inside the _the variable
_this = this;

exports.getAuthors = async function (req, res, next) {

    try {
        var Authors = await AuthorService.getAuthors()
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Authors, message: "Succesfully Authors Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}