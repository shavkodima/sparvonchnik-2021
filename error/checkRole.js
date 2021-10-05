const ROLE = {
    succes:['ADMIN']
}
module.exports = function(){
        return function(req, res, next){
            const {role} = req.session;
            if(!ROLE.succes.includes(role)){
                res.json('Доступ запрещен')
            }else{
                next()
            }
        }

}