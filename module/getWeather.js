const fetch = require('node-fetch');
const fs = require('fs');
const getCurrentDate = require('./getCurrentDate');

module.exports.getWeather = ()  => {
    // запрос с интервалом каждый час с. с помощью рекурсии
let timer = setTimeout(async function request() {
    console.log("Запрос данных погоды");
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=minsk&appid=884be3aa33d84d3ee694a3689e3ddbef&lang=ru&units=metric')
        .then(data => {
            return data.json();
        })
        .then(data => {
            let pogoda = data.main.temp + " C" + String.fromCharCode(176) + " " + data.weather[0].description;
            fs.writeFile('pogoda.txt', pogoda, function (err) {
                if (err) throw console.log(err);
                console.log("Запись прошла успешно " + getCurrentDate());
            })
        })
        .catch(err => {
            console.log("Ошибка при получении данных " + err);
        })
    timer = setTimeout(request, (60 * 60) * 1000);
}, 0)
}