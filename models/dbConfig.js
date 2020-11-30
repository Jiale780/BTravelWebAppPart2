var mysql = require("mysql");

var dbConnect = {};

dbConnect.getConnection = function() {
	var conn = mysql.createConnection(
		{
			host: "bddassignment2.cpifzxlswfwr.us-east-1.rds.amazonaws.com",
			user: "admin",
			password: "bddassignment2",
			database: "sp_travel"
		}
	);
	return conn;
}

module.exports = dbConnect