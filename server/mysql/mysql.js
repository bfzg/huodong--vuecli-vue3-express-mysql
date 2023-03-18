const mysql = require('mysql')

function createConnection() {
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:"200312",
        database:'vuehuodong',
        charset: "UTF8MB4_GENERAL_CI",
        collate: "utf8mb4_unicode_ci",
    });
    return connection;
}

module.exports.createConnection = createConnection;
