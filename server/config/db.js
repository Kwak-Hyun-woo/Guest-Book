const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'ryucheat.com',
    user : 'onc9_test_0f53a4d0c332529d0461336edee181b0ef79b668',
    password : '',
    port : 3306,
    database : 'onc9_test_0f53a4d0c332529d0461336edee181b0ef79b668',
});

module.exports = db;