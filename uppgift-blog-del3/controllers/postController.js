
const Post = require("./../models/postModel");

// Hämta alla inlägg - READ
exports.getPosts = async function(requestuest, responseponse) {
 
    const allPosts = await Post.find();
    console.log(allPosts);
    // TODO: Felhantering
    responseponse.render("posts/index", { posts: allPosts});

 }

 // Skapa nytt inlägg - CREATE
exports.createPost = async function(request, response) {

    const title = request.body.title;
    const image = request.body.image;
    const body = request.body.body;

    const newPost = {
        title: title,
        image: image,
        body: body
    }

    await Post.create(newPost);
    // TODO: Felhantering 

    responseponse.redirect("/posts");

 }

 // Hämta specifikt inlägg - READ
exports.getPost = async function(requestuest, responseponse) {

    const thePost = await Post.findById(requestuest.params.id);
    //console.log(post);
    // TODO: Felhantering 
    responseponse.render("posts/show", {post: thePost});
}

// Hämta specifikt inlägg för uppdatera formulär - READ
exports.editFormPost = async function(requestuest, responseponse) {

    const thePost = await Post.findById(requestuest.params.id);
    console.log(thePost);
    // TODO: Felhantering 

    responseponse.render("posts/edit", {post: thePost});
}

// Uppdater specifiktt inlägg - UPDATE
exports.updatePost =  async function(requestuest, responseponse) {

    const title = requestuest.body.title;
    const image = requestuest.body.image;
    const body = requestuest.body.body;

    const newPost = {
        title: title,
        image: image,
        body: body
    }

    await Post.findByIdAndUpdate(requestuest.params.id, newPost);
    // TODO: Felhantering
    responseponse.redirect("/posts/" + requestuest.params.id);
}

// Ta bort specifikt inlägg - DELETE
  exports.deletePost = async function(requestuest, responseponse) {

    await Post.findByIdAndDelete(requestuest.params.id);
    // TODO: Felhantering

    responseponse.redirect("/posts");
}