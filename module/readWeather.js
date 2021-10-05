const fs = require('fs');

module.exports.readWeatherFiles = () =>{
    const getweather = fs.readFileSync('pogoda.txt', 'utf8');
    if(getweather == null || getweather == undefined){
        return "Ошибка при чтении файла pogoda.txt"
    }else{
        return getweather;
    }
}