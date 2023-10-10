// Class: DAAA/FT/1B/04
// Admission Number: P2237871
// Name: Ashley Bai

const express = require("express");
const jwt = require("jsonwebtoken");
const { jwt_sign } = require("../config");
const userDB = require("../model/userDB");
const secretKey = "ashley";

var app = express();

app.use(express.static("./frontend"))
app.use(express.json());

// authorization
function verifyToken(req, res, next) {
    var token = req.headers["authorization"];

    if (!token || !token.includes("Bearer ")) {
        res.status(403);
        res.send({ auth: false, message: "Not authorised" });
    } else {
        token = token.split("Bearer ")[1];
        console.log(token);
        jwt.verify(token, secretKey, (err, result) => {
            if (err) {
                res.status(403);
                res.send({ auth: false, message: "Erroneous token" });
            } else {
                req.auth = result;
                next();
            }
        })
    }
}

// login 
app.post("/user/login", (req, res) => {
    userDB.verifyLogin(req.body.username, req.body.password, (err, result) => {
        if (err) {
            res.status(500);
            res.send({ auth: false, error_msg: "Internal Server Error" });
        } else {
            if (result.length < 1) {
                res.status(401);
                res.send({ auth: false });
            } else {
                res.status(200);
                var payload = { username: result[0].username, role: result[0].role }
                var jwToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
                res.send({ auth: true, token: jwToken })
            }
        }
    })
})

// get user profile
app.get("/user/staffProfile", verifyToken, (req, res) => {
    userDB.getStaff(req.auth.username, (err, result) => {
        if (err) {
            res.status(500);
            res.send({ error_msg: "Internal Server Error" });
        } else {
            if (result.length < 1) {
                res.status(204);
                res.send();
            } else {
                res.status(200);
                res.send(result);
            }
        }
    })
})

// get category (dropdown)
app.get("/filmCategories", (req, res) => {
    userDB.getFilmCategories((err, result) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// search by substring
app.post('/film/search', (req, res) => {
    userDB.searchBySubString(req.body.substring, req.body.rental, (err, result) => {
        if (err) {
            res.status(500);
            res.send({ "error_msg": "Internal server error" });
        } else if (result === null) {
            res.status(204);
            res.send();
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// search by category
app.post('/category/search', (req, res) => {
    userDB.searchByCategory(req.body.category, req.body.rental, (err, result) => {
        if (err) {
            res.status(500);
            res.send({ "error_msg": "Internal server error" });
        } else if (result.length == 0) {
            res.status(204);
            res.send();
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// get actor details by film id
app.get("/actorDetails/:film_id", (req, res) => {
    userDB.actorByID(req.params.film_id, (err, result) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// add actor
app.post("/actor", verifyToken, (req, res) => {
    if (req.auth.role == 'admin') {
        var numOfProperty = Object.keys(req.body).length;
        var count = 0, validBody = true;

        for (let p in req.body) {
            if (p == "first_name" || p == "last_name") {
                count++;
            } else {
                validBody = false;
            }
        }

        if (count < 1) {
            validBody = false;
        }

        if (validBody) {
            userDB.addActor(req.body, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ error_msg: "Internal Server Error" });
                } else {
                    res.status(200);
                    res.send({ success_msg: "User id " + result.insertId + " successfully added" });
                }
            })
        } else {
            res.status(400);
            res.send({ "error_msg": "missing data" });
        }
    } else {
        res.status(401).send({ auth: false, message: "Insufficient privileges" });
    }
})

// add customer
app.post('/customers', verifyToken, (req, res) => {
    if (req.auth.role == 'admin') {
        userDB.addCust(req.body, (err, result) => {
            if (err?.code == "ER_BAD_NULL_ERROR") {
                res.status(400);
                res.send({ "error_msg": "missing data" });
            } else if (err?.code == "ER_DUP_ENTRY") {
                res.status(409);
                res.send({ "error_msg": "email already exist" });
            } else if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send({ "customer_id": result[1].insertId.toString() });
            }
        });
    } else {
        res.status(401).send({ auth: false, message: "Insufficient privileges" });
    }
});

// search results page - show brief info
app.get("/filmInfo", (req, res) => {
    userDB.filmInfo((err, result) => {
        if (err) {
            res.status(500);
            res.send({ error_msg: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
});

// full dvd details
app.get("/dvd/searchDetails/:film_id", (req, res) => {
    userDB.dvdDetails(req.params.film_id, (err, result) => {
        if (err) {
            res.status(500);
            res.send({ error_msg: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
});


module.exports = app;