const db = require("./dbConfig.js");

var userDB = {};

userDB.deleteUser = function (admin_id, callback) {
    var conn = db.getConnection();

    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            console.log("Connected!");
            var sqlStmt = "DELETE FROM sp_travel.admin WHERE admin_id=?";

            conn.query(sqlStmt, [admin_id], (err, result) => {
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
};

module.exports = userDB