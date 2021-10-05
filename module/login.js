// const logs = require('./log')
// const bcrypt = require('bcrypt');
// const conn = require('./db_connect');
// const login = {

//     loginSession(req, res){
//         if (req.session.user) {
//             res.redirect('/edit')
//         } else {
//             res.render('login.hbs')
//         }
//     },

//     async loginAuthentication(req, res){
//         const getUserConnectIp = req.connection.remoteAddress;
//         const {login, password} = req.body;
//         conn.query('SELECT * FROM profileadmin WHERE login=?', login, (error, result)=>{
//             const isMatch =  bcrypt.compareSync(password, result[0].password)
//             if (isMatch) {
//                 req.session.user = result[0].login;
//                 req.session.role = result[0].role;
//                 res.redirect('edit');
//                 logs(result[0].id, getUserConnectIp, login);
//                 return;
//             }
//             res.render('login.hbs', {
//                 invalid: "Неверный логин или пароль"
//             })
//         })
//     },

//     logout(req, res){
//         req.session.destroy();
//         res.redirect('/login')
//     },

// }

// module.exports = login;