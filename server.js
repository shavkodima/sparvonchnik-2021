const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const conn = require('./module/db_connect')
const getCurrentDate = require('./module/getCurrentDate');
const fs = require('fs');
const getDataWeather = require('./module/getWeather')
const readFilesWeather = require('./module/readWeather')
const editPage = require('./module/edit');
const CheckLogin = require('./error/middwareLogin')
const profileAdmin = require('./module/addProfileAdmin')
const router = require('./router/router');
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
hbs.registerPartials(__dirname + '/views/partials')

app.use(cookieParser('phoneMinsktrans2021'))

app.use(session({
    secret: 'phoneMinsktrans2021', 
    saveUninitialized: true,
}))
app.use(express.static('public'));
app.use(express.json())
app.use('/', router)


app.set("view engine", "hbs");

const flagSmile = true;

app.get('/', (req, res) => {
    let ip =req.connection.remoteAddress;
    ip =  ip.substring(7, ip.length)

    if((ip == "192.168.1.145" || ip == "192.168.1.31") && !flagSmile){
        res.render('smile/smile.hbs',{
            title:"Упс?! ;-) Как вы здесь оказались?",
            img:"https://kotiki.net/wp-content/uploads/2016/04/kotiki.net-%D0%BA%D0%BE%D1%82-%D1%85%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA-27.jpg"
        })
    }else{
        res.render('index.hbs')
    }
})

app.get('/getWeather', (req, res) => {
    let readFilesValue = readFilesWeather.readWeatherFiles();
    res.send(readFilesValue);
})
app.post('/submitNewProfile', urlencodedParser, CheckLogin, (req, res) => {
    const n = req.body.category,
        s = req.body.subOtdel,
        si = req.body.subOtdelItem,
        u = req.body.userFio,
        p = req.body.position,
        uP = req.body.userPhone,
        uM = req.body.userMobile,
        uF = req.body.userFax,
        uMail = req.body.userEmail;
    const data = [u, n, s, si, p, uP, uM, uF, uMail];
    conn.query("INSERT INTO users (userFio, category, subOtdel, subOtdelItem, position, userPhone, userMobile, userFax, emailUsers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", data, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/pageAddProfile')
        }
    })
    
})


app.get('/editProfile/:id', CheckLogin, (req, res) => {
    editPage.pageEditIdUser(req, res);
})

app.get('/edit/goods', (req, res) => {
    res.render('goods.hbs')
})
app.get('/goods', (req, res) => {
    res.render('goods.hbs')
})

app.get('/api', (req, res) => {
    let ip =req.connection.remoteAddress;
    ip =  ip.substring(7, ip.length)
    console.log(ip);

        conn.query("SELECT * FROM users", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result)
            }
        })
})
app.get('/getDateUpdate', (req, res) => {
    conn.query("SELECT * FROM dateupdate", (err, result) => {
        if (err) {
            console.log("Ошибка получения данных (дата обновления)" +  err);
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/tables', (req, res)=>{
    res.render('tables.hbs')
})

app.post('/submitNewUserAdmin',urlencodedParser, CheckLogin, (req, res)=>{
    profileAdmin.modelUser(req.body, res)
})

app.post('/getUserAdmin',(req, res)=>{
    let {idUser} = req.body
    conn.query('SELECT id, login, filial, role FROM profileadmin WHERE id=?', idUser, (err, result)=>{
        res.send(result)
    })
})

app.post('/updateAdminProfile', (req, res)=>{
    try {
        if(req.body.hasOwnProperty('password')){
            const {id, password, role } = req.body;
            const hashPassword = bcrypt.hashSync(password, 7);
            const data = [hashPassword, role, id]
            conn.query('UPDATE profileadmin SET password=?, role=? WHERE id=?', data, (err, result)=>{
                res.json({message:"Данные успешно сохранены"})
            })
        }else{
            const {id, role } = req.body;
            const data = [role, id]
            conn.query('UPDATE profileadmin SET role=? WHERE id=?', data, (err, result)=>{
                res.json({message:"Данные успешно сохранены"})
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(port, (err) => {
    if (err) throw err
    console.log(" Слушает " +  port  + " порт");
})
getDataWeather.getWeather();

module.exports = getCurrentDate;