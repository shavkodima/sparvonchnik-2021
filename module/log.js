
const fs = require('fs');
const getCurrentDate = require('./getCurrentDate');

const logs = (id, ip, userLogin) =>{
    let configUser =ip + " " + id + " " + userLogin; 
    configUser = "\r\n" + configUser + " " + "- login " + getCurrentDate();
    const filesLog =fs.appendFile('log.txt', configUser , function(err){
        if(err){
            console.log("ошибка")
        }else{
            console.log("успех");
        }
    });
}

module.exports = logs;