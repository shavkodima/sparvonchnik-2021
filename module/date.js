const conn = require('./db_connect')
const getCurrentDate = require('./getCurrentDate');
const postDate = async () => {
    conn.query('UPDATE dateupdate SET dates=?', getCurrentDate(), (err, result) => {
        if (err) console.log(err);
    })
}

module.exports = postDate;