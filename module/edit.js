// const login = require("./login");
// const conn = require('./db_connect')
// const postDate = require('./date')
// const editPage = {

//     edit(req, res) {
//         console.log(req.session);
//         const title = "Администрирование записей"
//             conn.query("SELECT * FROM users", (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     if (req.session.role == 'ADMIN') {
//                         res.render('editAdmin.hbs', {
//                             users: result,
//                             titleEdit: title,
//                             userProfile: req.session.user,
//                         })
//                     } else {
//                         res.render('edit.hbs', {
//                             users: result,
//                             titleEdit: title,
//                             userProfile: req.session.user
//                         })
//                     }
//                 }
//             })
//     },

//     editUpdateProfile(req, res) {
//         let userFio = req.body.userFio,
//             category = req.body.category,
//             subOtdel = req.body.subOtdel,
//             position = req.body.position,
//             userPhone = req.body.userPhone,
//             userMobile = req.body.userMobile,
//             userFax = req.body.userFax,
//             userEmail = req.body.emailUsers,
//             id = req.body.id;
//         let data = [userFio, category, subOtdel, position, userPhone, userMobile, userFax, userEmail, id];
//         conn.query('UPDATE users SET userFio=?, category=?, subOtdel=?, position=?, userPhone=?, userMobile=?, userFax=?, emailUsers=? WHERE id=?', data, (err, result) => {
//             if (err) throw err;
//             res.redirect('/edit')
//         })
//         postDate();
//     }

// };

// module.exports = editPage;