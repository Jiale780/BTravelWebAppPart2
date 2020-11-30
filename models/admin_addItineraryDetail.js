const db = require("./dbConfig.js");

var userDB = {};

userDB.addItineraryDetail = function(Day, Activity, Travel_ID, callback) {
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
            var sqlStmt = "INSERT INTO sp_travel.itinerary (Day, Activity, Travel_ID) VALUES (?, ?, ?)";

            conn.query(sqlStmt, [Day, Activity, Travel_ID], (err,result)=> {
                conn.end();
                if (err) {
                    console.log("Unable to run this sql query!");
                    return callback(err.sqlMessage, null);
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