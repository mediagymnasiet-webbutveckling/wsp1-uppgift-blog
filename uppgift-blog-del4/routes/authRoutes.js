const express = require("express");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./../models/userModel");
// Skapar modulen routes (route-handler)
const router = express.Router();

//==== AUTH ROUTES =====//

// Registering
router.get("/register", function(request, response) {
        response.render("register");
});

router.post("/register", function(request, response, next) {
   const newUser = new User({
        username: request.body.username
   });
   // Spara användaren databasen
   User.register(newUser, request.body.password, function(error, user) {
        console.log(user);
        if(error) {
            return response.render("register");
        } else {
            next();
        }
   });
}, passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}));

// Login
router.get("/login", function(request, response) {
    response.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}) 
, function(request, response) {
});

// Logga ut
router.get("/logout", function(request, response) {
   // Avsluta session
   request.logOut();
   response.redirect("/login");
});


//==================//

 // Exportera vår modul
 module.exports = router;