// Hämta modulen express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ejs = require("ejs");
const methodOverride = require("method-override");
const postRoutes = require("./routes/postRoutes");

// Definiera sökvägen till vår config.env
dotenv.config({path: "./config.env"});

// Ropar på express-funktionen och skapar objeketet app
const app = express();

// Ange att EJS är vår templatemotor
app.set("view engine", "ejs");

// Serva statiska filer, ex css, bilder...
app.use(express.static("public"));

// Den port vi ska kommunicera på
const port = process.env.PORT;

// Middleware
// Tala om för vår app att datat som kommer in är JSON  
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));

// Sätter upp våra routes till /posts
app.use("/posts", postRoutes);

// URL för databasuppkoppling
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

// Databasuppkoppling
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    //useUnifiedTopology: true 
}).then(function(con) {
       // console.log(con.connection);
        console.log("Databasuppkoppling lyckades!");
});

// Sätter vi upp vår http-server
app.listen(port, function() {
    console.log(`Vår applikation lyssnar på port ${port}`);
});