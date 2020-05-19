// Hämta modulen express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const sessions = require("client-sessions");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");

const User = require("./models/userModel");

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

// ==== SESSION ===/
app.use(sessions({
    cookieName: "session",
    // TODO: LAGRA I MILJÖVARIABEL
    secret: "När tar 17 te studenten",
    duration: 30*60*100,
}));

// ==== PASSPORT CONFIGURATION ===/

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(request, response, next) {
    response.locals.currentUser = request.user;
    next();
});

//===============================/

// Sätter upp våra routes till /posts
app.use("/", authRoutes);
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