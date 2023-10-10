// Class: DAAA/FT/1B/04
// Admission Number: P2237871
// Name: Ashley Bai

const db = require("./dbConfig");

var userDB = {};

// login
userDB.verifyLogin = (username, password, callback) => {
    var conn = db.getConnection();

    var sqlStmt = "SELECT * FROM staff WHERE username = ? AND password = ?;";

    conn.query(sqlStmt, [username, password], (err, result) => {
        conn.end();

        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    })
}

// get user profile
userDB.getStaff = (username, callback) => {
    var conn = db.getConnection();

    var sqlStmt = "SELECT * FROM staff WHERE username = ?";

    conn.query(sqlStmt, [username], (err, result) => {
        conn.end();
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    })
}

// get film categories
userDB.getFilmCategories = (callback) => {
    var conn = db.getConnection();

    var sqlStmt = "SELECT name FROM category";

    conn.query(sqlStmt, (err, result) => {
        conn.end();
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
}

// search by substring
userDB.searchBySubString = (subString, rental, callback) => {
    var conn = db.getConnection();

    var sqlStmt = "SELECT * FROM film WHERE title LIKE '%" + subString + "%' AND rental_rate < ?;";

    conn.query(sqlStmt, [rental], (err, result) => {
        conn.end();
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
}

// search by film category
userDB.searchByCategory = (category, rental, callback) => {
    var conn = db.getConnection();

    var sqlStmt = 'SELECT * FROM film_category INNER JOIN category ON film_category.category_id = category.category_id INNER JOIN film ON film_category.film_id = film.film_id WHERE name = ? AND rental_rate < ?;'

    conn.query(sqlStmt, [category, rental], (err, result) => {
        conn.end();
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
}

// search results page: show brief info 
userDB.filmInfo = (callback) => {
    var conn = db.getConnection();

    var sqlStmt = "SELECT title, release_year, rating FROM film";

    conn.query(sqlStmt, (err, result) => {
        conn.end();
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    })
}

// full dvd details page: show full info
userDB.dvdDetails = (filmId, callback) => {
    var conn = db.getConnection();

    var sqlStmt = "SELECT * FROM film_category INNER JOIN category ON film_category.category_id = category.category_id INNER JOIN film ON film_category.film_id = film.film_id where film.film_id=?"

    conn.query(sqlStmt, [(filmId)], (err, result) => {
        conn.end();
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    })
}

// get actor info by film id
userDB.actorByID = (film_id, callback) => {
    var conn = db.getConnection();

    var sqlStmt = 'SELECT * FROM film_actor INNER JOIN actor ON film_actor.actor_id = actor.actor_id INNER JOIN film ON film_actor.film_id = film.film_id WHERE film.film_id = ?;'

    conn.query(sqlStmt, [parseInt(film_id)], (error, results) => {
        conn.end();
        if (error) {
            return callback(error, null);
        };
        return callback(null, results);
    });
}

// add actor
userDB.addActor = (actorDetails, callback) => {
    var conn = db.getConnection();

    var sqlStmt = "INSERT INTO `bed_dvd_db`.`actor` (`first_name`, `last_name`) VALUES (?, ?)";

    conn.query(sqlStmt, [actorDetails.first_name, actorDetails.last_name], (err, result) => {
        conn.end();
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            console.log(result);
            return callback(null, result);
        }
    })
}

// add customer
userDB.addCust = (customer, callback) => {
    var conn = db.getConnection();

    var sqlStmt = `INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?, ?, ?, ?, ?, ?); INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?, ?, ?, ?, LAST_INSERT_ID());`;

    conn.query(sqlStmt, [customer.address, customer.address2, customer.district, customer.city_id, customer.postal_code, customer.phone, customer.store_id, customer.first_name, customer.last_name, customer.email], (err, result) => {
        conn.end();
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    });
}


module.exports = userDB;