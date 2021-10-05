const Router = require('express');
const router = new Router();
const pageEditController = require('../controller/pageEditController');
const checkLogin = require('../error/middwareLogin')
const checkSession = require('../error/checkSession')
const checkRole = require('../error/checkRole')


router.get('/pageEdit', checkSession, pageEditController.edit)
router.get('/pageListAdmin', checkSession, checkRole(), pageEditController.listAdminUser)
router.get('/pageNewProfile', checkSession, pageEditController.pageNewProfile)




module.exports = router;