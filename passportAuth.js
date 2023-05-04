const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const con = require("./DB_Connection")



passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
     
    function (email, password, done) {
       
        con.query("SELECT * FROM reginfo WHERE email = ?", [email], function (err, result) {
            if (err) {
             
                return done(err);
            }
            if (!result.length) {
             
                return done(null, false);
            }
            if (result[0].password !== password) {
                
                return done(null, false);
            }
           
            return done(null, result[0]);
        });
    }
));

passport.serializeUser((user, done) => {
    // console.log("ji")
    if (user) {
        return done(null, user.email)
    }
    return done(null, false)
})

passport.deserializeUser((email, done) => {
    // console.log("ji2")
    // console.log(username)
    con.query("SELECT * FROM reginfo WHERE Email = ?", [email], (err, result) => {
        if (err) {
            return done(error);
        }
        if (result.length) {
            return done(null, result[0]);
        }
        return done(null, false);
    })
});

module.exports = {
    passport: passport
}
