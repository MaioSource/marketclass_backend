var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['draft', 'published', 'unpublished'],
        default: 'draft'
    },
    course_author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    course_name: {
        'type': String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
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

CommentSchema.plugin(mongoosePaginate);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;