var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/signup', UserController.createUser)
router.post('/reset', UserController.resetPassword)
router.post('/login/', UserController.loginUser)
router.get('/user', Authorization, UserController.getUser)
router.get('/verify', UserController.verifyUser)
router.put('/update', Authorization, UserController.updateUser)


// Export the Router
module.exports = router;


