const {Router} = require('express')
const router = new Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const pageEditController = require('../controller/pageEditController');
const checkLogin = require('../error/middwareLogin')
const checkSession = require('../error/checkSession')
const checkRole = require('../error/checkRole')


router.get('/editProfile/:id', checkSession, pageEditController.pageEditIdUser)
router.post('/deleteProfile/:id', checkSession, pageEditController.deleteProfile)
router.post('/updateProfile',urlencodedParser,checkSession, pageEditController.editUpdateProfile)
module.exports = router;



