const express = require("express");
const {getPosts, createPost, getPost,
     editFormPost, updatePost, deletePost, showFormForComment, createCommentByPost } = require("./../controllers/postController");
const {isLoggedIn} = require("./../middleware/authMiddleware");

// Skapar modulen routes (route-handler)
const router = express.Router();

// 7 REST API routes för vår blog

// 1. Visar alla inlägg
router.get("/",  isLoggedIn ,getPosts);
 
 // 2. Visa ett formulär för att skapa ett nytt inlägg
 router.get("/new", function(request, response) {
     response.render("posts/new");
 });
 
 // 3. Skapa ett nytt inlägg
 router.post("/",  createPost);
 
 // 4. Visa specifikt inlägg
 router.get("/:id", getPost);
 
 // 5. Visa ett formulär för att uppdatera ett inlägg
 router.get("/:id/edit", editFormPost);
 
 // 6. Uppdatera ett specifikt inlägg
 router.put("/:id", updatePost);
 
 // 7. Ta bort ett specifik inlägg
 router.delete("/:id", deletePost);
 
 /* Routes för kommenterar*/

 // Visa ett formulär för ny kommentar
 router.get("/:id/comments/new", showFormForComment);

 // Skapa ny kommentar
 router.post("/:id/comments", createCommentByPost);


 // Exportera vår modul
 module.exports = router;