const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    database: "node_complete",
    password: "Momoo_14"
})

module.exports = pool.promise();