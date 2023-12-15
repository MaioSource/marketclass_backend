// Gettign the Newly created Mongoose Model we just created 
var Comment = require('../models/Comment.model');
var Course = require('../models/Course.model');

// Saving the context of this module inside the _the variable
_this = this

exports.getComments = async function (params) {

    var domain = {
        course_author: params._id
    }
    try {
        var comment = await Comment.find(domain)
        return comment;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Get Course');
    }
}

exports.createComment = async function (comment) {

    var newComment = new Comment({
        name: comment.name,
        rating: comment.rating,
        created_at: new Date(),
        description: comment.description,
        course: comment.course
    })

    try {
        var courseObj = await Course.findById(comment.course)
        newComment.course_author = courseObj.author
        newComment.course_name = courseObj.title
        var savedComment = await newComment.save();
        var NewcourseObj = await courseObj.update({ $push: { comments: savedComment._id } }, { new: true });
        return savedComment;
    } catch (e) {
        console.log(e)    
        throw Error("Error on Create Comment")
    }
}

exports.updateComment = async function (comment) {
    try {
        var domain = {
            '_id': comment._id,
            'course_author': comment.userId,
        }

        var oldComment = await Comment.findOne(domain);
        // var oldComment = await Comment.findById(comment._id)

    } catch (e) {
        throw Error("Error occured while Finding the Course")
    }

    if (!oldComment) {
        throw Error("Error occured while Finding the Comment")
    }
    oldComment.updated_at = comment.updated_at
    oldComment.state = comment.state || oldComment.state;
    var courseObj = await Course.findOne(oldComment.course)

    var rating_domain = {
        course: oldComment.course,
        state: 'published'
    }
    var comments_rating = await Comment.find(rating_domain, {rating: 1})
    var total = comments_rating.reduce((sum, comments_rating) => sum + comments_rating.rating, 0);
    var avg_rating = total / comments_rating.length
    courseObj.avg_rating = avg_rating

    try {
        var savedComment = await oldComment.save()
        var savedCourse = await courseObj.save()
        return savedComment;
    } catch (e) {
        throw Error("And Error occured while updating the Comment" + e);
    }
}

exports.deleteComment = async function (params) {

    // Try Catch the awaited promise to handle the error 
    try {
        var domain = {
            '_id': params._id,
            'course_author': params.userId,
        }

        var comment = await Comment.findOneAndDelete(domain)
        if (!comment) {
            throw Error("Error occured while Finding the Comment")
        }
        return comment;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Delete Comment');
    }
}