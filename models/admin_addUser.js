const db = require("./dbConfig");

var userDB = {};

userDB.insertUser = function (email, name, password, role, message, callback) {
    var conn = db.getConnection();

    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sqlStmt = "INSERT INTO sp_travel.admin(email, name, password, role, message) VALUES (?, ?, ?, ?, ?)";

            conn.query(sqlStmt, [email, name, password, role, message], (err, result) => {
                conn.end();
                if (err) {
                    console.log("Unable to run this sql query!");
                    return callback(err.sqlMessage, null);
                }
                else {
                    console.log("Sql query is successful!");
                    return callback(null, result.affectedRows);
                }
            });
        }
    });
}

module.exports = userDB;