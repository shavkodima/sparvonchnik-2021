const Route = require('express')
const router = new Route();
const routerUser = require('./routerUser');
const routerEditPage = require('./routerEditPage');
const routerRewriteProfile = require('./routerRewriteProfile');

router.use('/user', routerUser)
router.use('/edit', routerEditPage)
router.use('/', routerRewriteProfile)
module.exports = router;