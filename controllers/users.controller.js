var UserService = require('../services/user.service');


// Saving the context of this module inside the _the variable
_this = this;

exports.getUser = async function (req, res, next) {

    try {
        var User = await UserService.getUser(req.userId)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: User, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        degree: req.body.degree,
        experience: req.body.experience,
        number: req.body.number
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function (req, res, next) {
    var User = {
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        picture: req.body.picture ? req.body.picture : null,
        degree: req.body.degree ? req.body.degree : null,
        experience: req.body.experience ? req.body.experience : null,
        number: req.body.number ? req.body.number : null,
        _id: req.userId,
    }

    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        if (loginUser===0)
            return res.status(400).json({message: "Usuario o contraseña incorrecta"})
        else
            return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.resetPassword = async function (req, res, next) {

    try {
        var User = await UserService.resetPassword(req.body.email)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, message: "Ok"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.verifyUser = async function (req, res, next) {

    try {
        var UserExist = await UserService.verifyUser(req.query.email)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, message: UserExist});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}