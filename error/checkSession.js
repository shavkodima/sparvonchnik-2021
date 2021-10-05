module.exports = function loginSession(req, res, next){

    console.log(req.session.user);
    if (req.session.user) {
        if(req.path == '/login'){
            res.redirect('/edit/pageEdit')
        }
        next()
    } else{
        res.render('login.hbs')
    }
}