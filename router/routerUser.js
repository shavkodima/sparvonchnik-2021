const Router = require('express');
const router = new Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const userController = require('../controller/userController');
const checkSession = require('../error/checkSession')



router.get('/login', checkSession)
router.post('/auth', urlencodedParser, userController.authentication)
router.get('/logout', userController.logout)


module.exports = router;