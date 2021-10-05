module.exports = function CheckLogin(req, res, next) {
    try {
        if (req.session.user) {
                next()
        } else {
            res.render('access-failed.hbs', {
                title: "Для редактирования, необходимо быть авторизированым",
                linkLogout: '/user/login'
            })
        }
    } catch (error) {
        res.send(error.message)
    }
}
