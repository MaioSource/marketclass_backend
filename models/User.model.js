var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const { cloudinary } = require('../services/upload.service');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    degree: String,
    experience: String,
    number: String,
    picture: {
        type: String,
        default: "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
    },
})

UserSchema.pre('save', function (next) {
    const img = this.picture;

    const uploadImage = new Promise((resolve, reject) => {
        cloudinary.uploader.upload(img, {
            public_id: 'users/'+this._id
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
            this.picture = result.secure_url;
            next();
        })
        .catch((error) => {
            next(error);
        });
});

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;  