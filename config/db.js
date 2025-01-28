const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'timetablecollege'
})

conn.connect((error) => {
    if(error) {
        return console.log('Unable to connect to the database:', error);
    } else {
        return console.log('Connection to the database has been established successfully.')
    }
})

module.exports = conn