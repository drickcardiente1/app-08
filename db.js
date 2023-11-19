const mysql = require("mysql2");

var db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database:"4357461_mbrdb",
    port:"3306"
});

db.getConnection((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Database Connected")
    }
})

module.exports = db;
