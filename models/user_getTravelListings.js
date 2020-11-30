const db = require("./dbConfig");

var userDB = {};

userDB.getTravelListings = function(callback) {
    var conn = db.getConnection();

    conn.connect((err)=> {
        if(err)
        {
            console.log(err);
            return callback(err,null);
        }
        else
        {
            console.log("Connected!");
            var sqlStmt = "SELECT * FROM sp_travel.travel_listing";

            conn.query(sqlStmt, [], (err,result)=> {
                conn.end();
                if (err) {
                    console.log("Unable to run this sql query!");
                    return callback(err, null);
                }
                else {
                    console.log("Sql query is successful!");
                    return callback(null, result);
                }
            });
        }
    });
}

module.exports = userDB;