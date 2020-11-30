const db = require("./dbConfig");

var userDB = {};

userDB.validateUser = function(admin_id, callback){
    var conn = db.getConnection();

    conn.connect(err=>{
        if(err)
        {
            console.log(err);
            return callback(err,null);
        } 
        else 
        {
            console.log("Connected!");
            var sqlStmt = 'SELECT * FROM sp_travel.admin where admin_id=?';

            conn.query(sqlStmt, [admin_id], (err,result)=>{
                conn.end();

                if(err)
                {
                    console.log("Unable to run this sql query!");
                    return callback(err, null);
                } 
                else 
                {
                    console.log("Sql query is successful!");
                    return callback(null, result);
                }
            });
        }
    });
}

module.exports = userDB;