// Hämta modulen express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

// Definiera sökvägen till vår config.env
dotenv.config({path: "./config.env"});

// Ropar på express-funktionen och skapar objeketet app
const app = express();

// Den port vi ska kommunicera på
const port = process.env.PORT;

// Middleware 
// Sätter upp våra routes till /posts
app.use("/posts", postRoutes);

// URL för databasuppkoppling
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

// Databasuppkoppling
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(function(con) {
       // console.log(con.connection);
        console.log("Databasuppkoppling lyckades!");
});

// Sätter vi upp vår http-server
app.listen(port, function() {
    console.log(`Vår applikation lyssnar på port ${port}`);
});