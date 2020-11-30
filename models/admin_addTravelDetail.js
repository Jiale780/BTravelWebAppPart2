const db = require("./dbConfig.js");

var userDB = {};

userDB.addTravelDetail = function(title, description, price, country, travel_period, image_URL, date_inserted, callback) {
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
            var sqlStmt = "INSERT INTO sp_travel.travel_listing (Title, Description, Price, Country, Travel_Period, Image_URL, Date_Inserted) VALUES (?, ?, ?, ?, ?, ?, ?);";
            

            conn.query(sqlStmt, [title, description, price, country, travel_period, image_URL, date_inserted], (err,result)=> {
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