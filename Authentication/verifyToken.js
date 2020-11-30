const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");

function verifyToken(req,res,next) {
    var token = req.headers["authorization"]; // To retrieve the authorization header’s content

    if(!token || !token.includes("Bearer ")) { 
        // To process the token
        res.status(403).send({"message":"The authorization token cannot be found!"});
    }
    else {
        token=token.split("Bearer ")[1]; // To gather the token’s value
        jwt.verify(token, jwtKey, (err,decoded) => {
            // To check the token
            if (err) {
                res.status(500).send(err);
            }
            else {
                req.auth = decoded; 
                next();
            }
        });
    }
}

module.exports = verifyToken;