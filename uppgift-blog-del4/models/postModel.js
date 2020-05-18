const mongoose = require("mongoose");

// Definerar vår post schema
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String
});

// Kopplar vårt mongoose schema till vår Post modell
const Post = mongoose.model("Post", postSchema);


module.exports = Post;