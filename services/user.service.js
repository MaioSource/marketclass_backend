// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')


// Saving the context of this module inside the _the variable
_this = this

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Async function to get the User List
exports.getUser = async function (userId) {

    // Try Catch the awaited promise to handle the error 
    try {
        var user = await User.findById(userId, {name: 1, email: 1, degree: 1, experience: 1, picture: 1, number: 1})
        return user;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.verifyUser = async function (userMail) {

    try {
        var domain = {
            email: userMail
        }
        var user = await User.findOne(domain)
        if(user){
            return true
        }
        return false;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 10);
    
    var newUser = new User({
        name: user.name,
        email: user.email,
        date: new Date(),
        password: hashedPassword,
        degree: user.degree,
        number: user.number,
        experience: user.experience
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findById(user._id);
        console.log (oldUser)
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }

    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    if(user.password)
        var hashedPassword = bcrypt.hashSync(user.password, 10);
    oldUser.name = user.name || oldUser.name
    oldUser.email = user.email || oldUser.email
    oldUser.password = hashedPassword || oldUser.password
    oldUser.picture = user.picture || oldUser.picture
    oldUser.experience = user.experience || oldUser.experience
    oldUser.degree = user.degree || oldUser.degree
    oldUser.number = user.number || oldUser.number

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User" + e);
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}

exports.resetPassword = async function (userMail) {

    // Try Catch the awaited promise to handle the error 
    try {
        var domain = {
            email: userMail
        }
        var user = await User.findOne(domain)
        if(user){
            var token = jwt.sign({
                id: user._id
            }, process.env.SECRET, {
                expiresIn: 3600
            });

            var resetLink = process.env.FRONTEND_URL + '/reset?token=' + token
            var text = 'Hola, ${user.name}. Restablece tu contraseña'
            var html = `
                <p>Hola, ${user.name},</p>
                <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el siguiente enlace para continuar con el proceso:</p>
                <p><a href="${resetLink}">Restablecer Contraseña</a></p>
                <p>Si no has solicitado este cambio, puedes ignorar este correo electrónico.</p>
                <p>Gracias,</p>
                <p>El Equipo de MarketClass</p>
                `;
            const msg = {
                to: userMail,
                from: 'tpo_api_uade@susoft.com.ar',
                subject: 'MarketClass: Restablece tu contraseña!',
                text: text,
                html: html,
              }
              
              sgMail
                .send(msg)
                .then((response) => {
                  console.log(response[0].statusCode)
                  console.log(response[0].headers)
                })
                .catch((error) => {
                  console.error(error)
                  throw Error('Error while reset password');
                })
        }
        return true;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while reset password');
    }
}