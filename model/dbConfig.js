// Class: DAAA/FT/1B/04
// Admission Number: P2237871
// Name: Ashley Bai

const mysql = require("mysql2");
const config = require("../config");

var db = {
    getConnection: ()=>{
        var conn = mysql.createConnection({
            host:"localhost",
            user:"bed_dvd_root",
            password:"pa$$woRD123",
            database:"bed_dvd_db"
        })

        return conn;
    }
}

module.exports = db;