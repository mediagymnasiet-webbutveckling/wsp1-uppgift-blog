const mongoose = require("mongoose");

// Definerar vår comment schema
const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Kopplar vårt mongoose schema till vår Comment modell
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;