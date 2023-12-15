var CommentService = require('../services/comment.service');


// Saving the context of this module inside the _the variable
_this = this;

exports.getComments = async function (req, res, next) {
    try {
        var params = {
            _id: req.userId,
        }
        var Comments = await CommentService.getComments(params)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Comments, message: "Succesfully Comments Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createComment = async function (req, res, next) {
    var Comment = {
        name: req.body.name,
        rating: req.body.rating,
        created_at: new Date(),
        description: req.body.description,
        course: req.body.course,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdComment = await CommentService.createComment(Comment)
        return res.status(201).json({createdComment, message: "Succesfully Created Comment"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull"})
    }
}

exports.updateComment = async function (req, res, next) {
    var Comment = {
        _id: req.params.id,
        state: req.body.state,
        updated_at: new Date(),
        userId: req.userId
    }

    try {
        var updatedComment = await CommentService.updateComment(Comment)
        return res.status(200).json({status: 200, message: "Succesfully Updated Comment"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.deleteComment = async function (req, res, next) {
    try {
        var Comment = {
            _id: req.params.id,
            userId: req.userId
        }
        var deletedComment = await CommentService.deleteComment(Comment)
        return res.status(200).json({status: 200, message: "Succesfully Deleted Comment"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


    
    
