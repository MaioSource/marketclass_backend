var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const { cloudinary } = require('../services/upload.service');
var Comment = require('../models/Comment.model');

var CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['individual', 'grupal'],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        enum: ['unica', 'semanal', 'mensual'],
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        default: "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    },
    state: {
        type: String,
        enum: ['published', 'unpublished'],
        default: 'published'
    },
    avg_rating: {
        type: Number
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

CourseSchema.pre('save', function (next) {

    const img = this.image;
    const uploadImage = new Promise((resolve, reject) => {
        cloudinary.uploader.upload(img, {
            public_id: 'courses/'+this._id
        },
        function(error, result) {
            if (error) {
                reject(error);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
    uploadImage
        .then((result) => {
            this.image = result.secure_url;
            next();
        })
        .catch((error) => {
            next(error);
        });
});

CourseSchema.plugin(mongoosePaginate);
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;