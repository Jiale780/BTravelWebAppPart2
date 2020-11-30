const db = require("./dbConfig.js");
/* By using jsonwebtoken library*/
const jwt = require("jsonwebtoken");
const config = require("../config.js");

var AdminDB = {};

AdminDB.getJWTLogin = function(email, password, role, callback){
    var conn = db.getConnection();

    conn.connect(err=>{
        if(err)
        {
            console.log(err);
            return callback(err,null);
        } 
        else 
        {
            var sqlStmt = "SELECT * FROM sp_travel.admin WHERE email=? AND password=? AND role=?";

            conn.query(sqlStmt, [email, password, role], (err,result)=> {
                conn.end();

                if (err)
                {
                    console.log(err);
                    return callback(err,null);
                } 
                else {
                    // console.log(config.key);
                    var token = "";
                    if (result.length > 0) 
                    {
                        var tokenPayload = { admin_id: result[0].admin_id, email: result[0].email, role: result[0].role };
                        token = jwt.sign(tokenPayload, config.jwtKey, { expiresIn: "2h" });
                        // console.log(tokenPayload);
                        return callback(null, token);
                    }
                    else 
                    {
                        return callback({ "message": "Invalid login!" }, null);
                    }
                }
            });
        }
    });
}

module.exports = AdminDB;