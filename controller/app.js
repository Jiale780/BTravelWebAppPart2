const express = require("express");
var Admin1 = require("../models/admin_jwtLogin.js");
var Admin2 = require("../models/admin_getAllUsers.js");
var Admin3 = require("../models/admin_validateUser.js");
var Admin4 = require("../models/admin_addUser.js");
var Admin5 = require("../models/admin_updateUser.js");
var Admin6 = require("../models/admin_deleteUser.js");
var Admin7 = require("../models/admin_addTravelDetail.js");
var Admin8 = require("../models/admin_addItineraryDetail.js");
var Admin9 = require("../models/admin_updateTravelDetail.js");
var Admin10 = require("../models/admin_updateItineraryDetail.js");
var Admin11 = require("../models/admin_deleteTravelDetail.js");
var User1 = require("../models/user_getTravelListings.js");
var User2 = require("../models/user_getTravelListsDescription.js");
var User3 = require("../models/user_getItineraryByTravelID.js");

var verifyToken = require("../Authentication/verifyToken.js");

var app = express();
app.use(express.json());

//Enable All CORS Requests//
var cors = require("cors");

var corsOptions = {
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/*By using jwt login with token Endpoint
http://localhost:5000/api/login_validation
method: GET
return: Login with using the authentication token */
var bodyParser = require("body-parser");
// Run body parser module
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Run body parser middleware
app.use(bodyParser.json()); // parse json data
app.use(urlencodedParser); // attach body-parser middleware
app.post("/api/login_validation", cors(corsOptions), (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    Admin1.getJWTLogin(email, password, role, (err,result)=>{
        if (err) {
            res.status(500).json(err);
        } 
        else {
            res.status(200).json({"token":result});
        }
    });
});

/* API Endpoint for retrieving all admin users
http://localhost:5000/api/admin_users
method: GET
return: all details */
app.get("/api/admin_users", verifyToken, cors(corsOptions), (req,res,next)=> { 
    if(req.auth.role == "admin") {
        Admin2.getAllUsers((err,result) => {
            if(err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    else { 
        res.status(500).send({"message":"user " + req.auth.email + " has no privilege for access"}); 
    }
});


/* API Endpoint for Admin Validation
http://localhost:5000/api/user
method: GET
return: Ensure that one admin record if name and password are entered correctly. */
app.get("/api/users", verifyToken, cors(corsOptions), (req,res)=>{
    var Admin_ID = req.auth.admin_id;
    if(req.auth.role == "admin") {
        Admin3.validateUser(Admin_ID, (err,result)=>{
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    }
    else { 
        res.status(500).json({"message":"user " + req.auth.email + " has no privilege for access"}); 
    }
});

/* API Endpoint for insert admin user record
http://localhost:2000/api/insertUser
Method: POST
return: 1 record inserted */
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded

app.post("/api/insertUser", verifyToken, cors(corsOptions), (req,res,next)=> {
    var email = req.body.email, name = req.body.name, role = req.body.role, 
    password = req.body.password, message = req.body.message;

    var Admin_ID = req.auth.admin_id;

    if(req.auth.role == "admin") {
        Admin4.insertUser(email, name, password, role, message, (err, result) => {
            if(err) {
                res.status(500).json({"message": err});
                }
            else {
                if(result==0) {
                    res.status(400).json(
                        {"message": "Record " + Admin_ID + " not found"}
                    );
                }
                else {
                    res.status(202).json(
                        {"message": "Record " + Admin_ID + " updated"}
                    );
                }
            }
        });
    }
    else { 
        res.status(500).send({"message":"user " + req.auth.email + " has no privilege for access"}); 
    }
});

/* API Endpoint for update the admin user details
http://localhost:5000/api/user/Miciko
method: PUT
return: To modify email, name and password based on user id */
app.put("/api/user/:name", verifyToken, cors(corsOptions), (req,res)=> {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var Admin_ID = req.auth.admin_id;

    if(req.auth.role == "admin") {
        Admin5.updateUser(name, email, password, Admin_ID, (err, result) => {
            if(err) {
                res.status(500).json({"message": err});
            }
            else {
                if(result==0) {
                    res.status(400).json(
                        {"message": "Record " + Admin_ID + " not found"}
                    );
                }
                else {
                    res.status(202).json(
                        {"message": "Record " + Admin_ID + " updated"}
                    );
                }
            }
        });
    }
    else { 
        res.status(500).send({"message":"user " + req.auth.email + " has no privilege for access"}); 
    }
});

/* API Endpoint for delete admin record
http://localhost:5000/api/user/4
Method: Delete
return: 1 record deleted */
app.delete("/api/user/:admin_id", verifyToken, (req,res)=> {
    var Admin_ID = req.auth.admin_id;

    if(req.auth.role == "admin") {
        Admin6.deleteUser(Admin_ID, (err,result)=>{
            if(err) {
                console.log(err);
                res.statusCode = 500;
                res.json(err);
            }
            else {
                if(result==0) {
                    res.status(400).json(
                        {"message": "Record " + Admin_ID + " not found"}
                    );
                }
                else {
                    res.status(202).json(
                        {"message": "Record " + Admin_ID + " deleted"}
                    );
                }
            }
        });
    }
    else { 
        res.status(500).send({"message":"user " + req.auth.email + " has no privilege for access"}); 
    }
});

/* API Endpoint by getting all travel listings
http://localhost:5000/api/travel_listings
method: GET
return: To retrieve all the travel listings. */
app.get("/api/travel_listings", verifyToken, cors(corsOptions), (req, res) => {
    User1.getTravelListings((err, result) => {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).json("Invalid Error. Please try it again...");
        }
    });
});

/* API Endpoint by getting travel listings based on substring of description & sorted in ascending in price
http://localhost:5000/api/travel_listing/Virtual_Tourism_in_Japan
method: GET
return: To retrieve all the travel listings based on substring of description & sorted in ascending in price. */
app.get("/api/travel_listing/:description", verifyToken, cors(corsOptions), (req, res) => {
    var description = req.params.description;

    User2.getTravelListsDescription(description, (err, result) => {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).json("Invalid Error. Please try it again...");
        }
    });
});

/* API Endpoint by getting itineraries for a particular travel listing which based on travel listing id
http://localhost:5000/api/travel_listing/2/itinerary
method: GET
return: To retrieve all the itineraries for a particular travel listing which based on travel listing id. */
app.get("/api/travel_listing/:Travel_ID/itinerary", verifyToken, cors(corsOptions), (req, res) => {
    var Travel_ID = req.params.Travel_ID;

    User3.getItineraryByTravelID(Travel_ID, (err, result) => {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).json("Invalid Error. Please try it again...");
        }
    });
});

/* API Endpoint by adding new travel details
http://localhost:5000/api/addtraveldetail
method: POST
return: To insert the new travel details. 
notice: The Travel_Period format need to be in 02-2030 and Date_Inserted need to be in timestamp format (2030-01-01 11:25:00)*/
var bodyParser = require("body-parser");
// Run body parser module
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Run body parser middleware
app.use(urlencodedParser); // attach body-parser middleware
app.use(bodyParser.json()); // parse json data

app.post("/api/addtraveldetail", verifyToken, cors(corsOptions), (req, res) => {

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var country = req.body.country;
    var travel_period = req.body.travel_period;
    var image_URL = req.body.image_URL;
    var date_inserted = req.body.date_inserted;

    Admin7.addTravelDetail(title, description, price, country, travel_period, image_URL, date_inserted, (err, result) => {
        if (err) {
            res.status(500).json({ "message": err });
        }
        else {
            res.status(201).json({ "1 travel details has been inserted": result });
        }
    });
});

/* API End point by adding new travel itinerary
http://localhost:5000/api/additinerarydetail
method: POST
return: To insert the new travel itineraries. 
notice: The Day and Travel_ID need to be in number digits. */
var bodyParser = require("body-parser");
// Run body parser module
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Run body parser middleware
app.use(urlencodedParser); // attach body-parser middleware
app.use(bodyParser.json()); // parse json data

app.post("/api/additinerarydetail", verifyToken, cors(corsOptions), (req, res) => {

    var Day = req.body.Day;
    var Activity = req.body.Activity;
    var Travel_ID = req.body.Travel_ID;

    Admin8.addItineraryDetail(Day, Activity, Travel_ID, (err, result) => {
        if (err) {
            res.status(500).json({ "message": err });
        }
        else {
            res.status(201).json({ "1 travel itinerary has been inserted": result });
        }
    });
});

/* API End point by updating travel details.
http://localhost:5000/api/updateTravelDetail/10
method: PUT
return: To update details based on Travel ID. */
app.put("/api/updateTravelDetail/:travel_ID", verifyToken, cors(corsOptions), (req, res)=>{
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var country = req.body.country;
    var travel_period = req.body.travel_period;
    var image_URL = req.body.image_URL;
    var date_inserted = req.body.date_inserted;
    var Travel_ID = req.params.travel_ID;

   Admin9.updateTravelDetail(title, description, price, country, travel_period, image_URL, date_inserted, Travel_ID, (err, result)=>{
        if(err) {
            res.status(500).json({"message": err});
        }
        else {
            if(result==0) {
                res.status(200).json(
                    {"message": "Record " + Travel_ID + " updated"}
                );
            }
        }
    });
});

/* API End point by updating itinerary details.
http://localhost:5000/api/updateItineraryDetail/6
method: PUT
return: To update day and activity based on travel_ID. */
app.put("/api/updateItineraryDetail/:travel_ID", verifyToken, cors(corsOptions), (req, res)=>{
    var day = req.body.day;
    var activity = req.body.activity;
    var Travel_ID = req.params.travel_ID;

   Admin10.updateItineraryDetail(day, activity, Travel_ID, (err, result)=>{
        if(err) {
            res.status(500).json({"message": err});
        }
        else {
            if(result==0) {
                res.status(200).json(
                    {"message": "Record " + Travel_ID + " updated"}
                );
            }
        }
    });
});

/* API End point by delete travel listing.
http://localhost:5000/api/deleteTravelDetail/19
method: DELETE
return: To delete travel listing which will cascade delete all the itinerary information. */
app.delete("/api/deleteTravelDetail/:travel_ID", verifyToken, cors(corsOptions), (req,res)=> {
    var Travel_ID = req.params.travel_ID;

    Admin11.deleteTravelDetail(Travel_ID, (err,result)=>{
        if(err) {
            res.status(500).json({"message": err});
        }
        else {
            if(result==0) {
                res.status(400).json(
                    {"message": "Record " + Travel_ID + " not found"}
                );
            }
            else {
                res.status(202).json(
                    {"message": "Record " + Travel_ID + " deleted"}
                );
            }
        }
    });
});

module.exports = app