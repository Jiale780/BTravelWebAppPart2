const db = require("./dbConfig");

var userDB = {};

userDB.getItineraryByTravelID = function(Travel_ID, callback) {
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
            var sqlStmt = "SELECT * FROM sp_travel.itinerary WHERE Travel_ID = ?";

            conn.query(sqlStmt, [Travel_ID], (err,result)=> {
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