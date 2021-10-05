const conn = require('../module/db_connect')
const getCurrentDate = require('../module/getCurrentDate');
const postDate = require('../module/date')

class PageEdit{
    edit(req, res) {
        const title = "Администрирование записей"
            conn.query("SELECT * FROM users", (err, result) => {
                if (err) {
                    console.log(err);
                } else {

                        res.render('edit.hbs', {
                            users: result,
                            titleEdit: title,
                            userProfile: req.session.user,
                        })
                }
            })
    }
    pageNewProfile(req, res){
        const addProfilTitle = "Добавить новую запись";
        res.render('addProfil.hbs', {
            title: addProfilTitle,
        })
    }
    deleteProfile(req, res){
        const id = req.params.id;
        const ip = req.connection.remoteAddress;
        const sessionName = req.session.user;
        let selectUsersDelete;
    
        conn.query("SELECT * FROM users WHERE id=?", [id], (err, result) => {
            if (err) throw console.log(err);
            selectUsersDelete = result[0].userFio;
            conn.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const titleLog = "Пользователь " + sessionName + " ip adress " + ip + " удалил запись " + selectUsersDelete;
                    console.log(titleLog);
                    res.redirect('/edit/pageEdit')
                }
            })
            getCurrentDate()
        })
    }

    pageEditIdUser(req, res) {
        const param = req.params.id;
        const title = "Редактирование записи";
            conn.query('SELECT * FROM users WHERE id=?', [param], (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render('editProfile.hbs', {
                        data: result[0],
                        titleEditProfile: title + ": " + result[0].userFio
                    })
                }
            })
    }

    editUpdateProfile (req, res) {
        console.log(req.body);
        let userFio = req.body.userFio,
            category = req.body.category,
            subOtdel = req.body.subOtdel,
            position = req.body.position,
            userPhone = req.body.userPhone,
            userMobile = req.body.userMobile,
            userFax = req.body.userFax,
            userEmail = req.body.emailUsers,
            id = req.body.id;
        let data = [userFio, category, subOtdel, position, userPhone, userMobile, userFax, userEmail, id];
        conn.query('UPDATE users SET userFio=?, category=?, subOtdel=?, position=?, userPhone=?, userMobile=?, userFax=?, emailUsers=? WHERE id=?', data, (err, result) => {
            if (err) throw err;
            res.sendStatus(200)
        })
        postDate();
    } 

    listAdminUser(req, res){
        conn.query('SELECT * FROM profileadmin LIMIT 5', (error, result)=>{
            res.render('newUserAdmin.hbs',{
                listUserAdmin:result
            })
        })
    }
}


module.exports = new PageEdit();