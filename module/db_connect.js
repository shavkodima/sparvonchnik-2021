
const sql = require('mysql2')

const conn = sql.createPool({
    database: 'db_test',
    host: 'localhost',
    user: 'root',
    password: 'root'
});



module.exports = conn;