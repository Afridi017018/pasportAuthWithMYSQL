const mysql = require("mysql");
const userSchema = require("./DB_UserSchema")


const databaseConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "passportauth"
}

const con = mysql.createConnection(databaseConfig);

con.connect((err) => {
    if (err) throw err;
    console.log("DB Connected")
})


con.query(userSchema);

module.exports = con;