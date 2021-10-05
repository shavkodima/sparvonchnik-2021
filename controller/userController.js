const conn = require('../module/db_connect')
const logs = require('../module/log')
const bcrypt = require('bcrypt');
const profileAdmin = require('../module/addProfileAdmin')

class Cabinet {


    async authentication(req, res) {

            const getUserConnectIp = req.connection.remoteAddress;
            const { login, password } = req.body;
            conn.query('SELECT * FROM profileadmin WHERE login=?', login, (error, result) => {
        
                if(result.length != 0 ){
                    const isMatch = bcrypt.compareSync(password, result[0].password)
                    if (isMatch) {
                        req.session.user = result[0].login;
                        req.session.role = result[0].role;
                        logs(result[0].id, getUserConnectIp, login);
                        res.cookie("token",req.sessionID)
                        res.redirect('/edit/pageEdit')
                    } else {
                        res.render('login.hbs', {
                            invalid: "Неверный логин или пароль"
                        })
                    }
                }else{
                    res.render('login.hbs', {
                        invalid: "Такого пользователя не существует"
                    })
                }
            })
    }
    logout(req, res) {
        req.session.destroy();
        res.clearCookie()
        res.redirect('/user/login')
    }
}

module.exports = new Cabinet();