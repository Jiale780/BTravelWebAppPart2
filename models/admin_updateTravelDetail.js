const db = require("./dbConfig.js");

var userDB = {};

userDB.updateTravelDetail = function(title, description, price, country, travel_period, image_URL, date_inserted, travel_ID, callback) {
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
            var sqlStmt = "UPDATE sp_travel.travel_listing SET Title=?, Description=?, Price=?, Country=?, Travel_Period=?, Image_URL=?, Date_Inserted=? WHERE Travel_ID=?";
            
            conn.query(sqlStmt, [title, description, price, country, travel_period, image_URL, date_inserted, travel_ID], (err,result)=>{
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
