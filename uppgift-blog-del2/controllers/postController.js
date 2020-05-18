
const Post = require("./../models/postModel");

// Hämta alla inlägg - READ
exports.getPosts = function(request, response) {
    response.send("Visar alla inlägg");
 }

 // Skapa nytt inlägg - CREATE
exports.createPost = function(request, response) {
    response.send("Skapa ett nytt inlägg");
 }

 // Hämta specifikt inlägg - READ
exports.getPost = function(request, response) {
    response.send("Visa specifikt inlägg");
}

// Hämta specifikt inlägg för uppdatera formulär - READ
exports.editFormPost = function(request, response) {
    response.send("Vise ett formulär för att uppdatera");
}

// Uppdater specifiktt inlägg - UPDATE
exports.updatePost =  function(request, response) {
    response.send("Uppdatera specifikt inlägg");
}

// Ta bort specifikt inlägg - DELETE
  exports.deletePost = function(request, response) {
    response.send("Ta bort ett specifikt inlägg");
}