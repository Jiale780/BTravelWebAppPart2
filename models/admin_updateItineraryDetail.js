const db = require("./dbConfig.js");

var userDB = {};

userDB.updateItineraryDetail = function(day, activity, travel_ID, callback) {
    var conn = db.getConnection();

    conn.connect((err)=>{
        if (err) 
        {
            console.log(err);
            return callback(err,null);
        }
        else 
        {
            console.log("Connected!");
            var sqlStmt = "UPDATE sp_travel.itinerary SET Day=?, Activity=? WHERE Travel_ID=?";
            
            conn.query(sqlStmt, [day, activity, travel_ID], (err,result)=>{
                conn.end();
                if (err) 
                {
                    console.log("Unable to run this sql query!");
                    return callback(err.sqlMessage,null);
                } 
                else 
                {
                    console.log("Sql query is successful!");
                    return callback(null,result.insertId);
                }
            });
        }
    });
}

module.exports = userDB
