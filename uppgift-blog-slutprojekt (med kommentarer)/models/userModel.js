const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Definerar vår user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Importera metoder från Passport för att användas med Moongose
userSchema.plugin(passportLocalMongoose);

// Kopplar vårt mongoose schema till vår Post modell
const User = mongoose.model("User", userSchema);

module.exports = User;