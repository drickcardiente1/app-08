const mysql = require("mysql2");

// var db = mysql.createPool({
//     host: "sql.freedb.tech",
//     user: "freedb_example-user",
//     password: "%?bnY!9GNMDAem?",
//     database:"freedb_4357461_mbrdb",
//     port:"3306"
// });


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
