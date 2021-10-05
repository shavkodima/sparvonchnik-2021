const conn = require('./db_connect');
const bcrypt = require('bcrypt')

function User(userLogin, userPassword, userFilial, userRole) {
    this.login = userLogin;
    this.password = userPassword;
    this.filial = userFilial;
    this.role = userRole;
    return;
}


const profileAdmin = {
    modelUser(userInput, res) {
        let { login, password, filial, role } = userInput;
        const hashPassword = bcrypt.hashSync(password, 7);
        const objectUser = new User(login, hashPassword, filial, role)
        this.addDatabaseUser(objectUser,res);
    },
    addDatabaseUser (user,res) {
        try {
            let arr = [user.login, user.password, user.filial, user.role];
            let {message, validColor} = "";
            conn.query('INSERT INTO profileadmin (login, password, filial, role) VALUES (?, ?, ?, ?)', arr, (error, result) => {
                if (error) {
                    console.log(error);
                    message = "Ошибка при добавлении"
                    validColor = "red"
                }else{
                    message = "Пользователь успешно добавлен"
                    validColor = "green"
                }
                res.redirect('/addNewUserAdmin')
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    listUserAdmin(callback){
        conn.query('SELECT * FROM profileadmin LIMIT 5', (error, result)=>{
            callback(result)
        })
    }
}


module.exports = profileAdmin;