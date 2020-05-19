const mongoose = require("mongoose");

// Definerar vår post schema
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// Kopplar vårt mongoose schema till vår Post modell
const Post = mongoose.model("Post", postSchema);

module.exports = Post;