const express = require("express")

const session = require("express-session")

const {passport} = require('./passportAuth')
const con = require("./DB_Connection")


const app = express();
const port = 5000;

app.use(express.json());




app.use(session({
    secret: "Askjdgaksf",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }


}))

app.use(passport.initialize())
app.use(passport.session())



const isAuthenticated= (req,res,next)=>{

    if(req.user){
      return next();
    }
    return res.send("Login please")
  }

app.get("/", isAuthenticated, (req, res) => {

    res.send("This is home")

})

app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: '/login'
}));



app.post("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send("Logged Out!");
    });
});


app.listen(port, () => {
    console.log(`sever is listening on port ${port}`)
})