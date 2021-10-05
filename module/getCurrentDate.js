
const getCurrentDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hour = date.getHours();
    let min = date.getMinutes();
    const year = date.getFullYear();
    const counter =10;
    if(month < counter){
        month = "0" + month;
    }
    if (day < counter) {
        day = "0" + day;
    }
    if(hour < counter){
        hour = "0" + hour;
    }
    if(min < counter){
        min = "0" + min;
    }
    const dates = day + "." + month + "." + year + " " + hour + ":" + min;
    return dates;
}

module.exports = getCurrentDate;