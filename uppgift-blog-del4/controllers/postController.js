
const Post = require("./../models/postModel");

// Hämta alla inlägg - READ
exports.getPosts = async function(request, response) {
 
    const allPosts = await Post.find();
    console.log(allPosts);
    // TODO: Felhantering
    response.render("posts/index", { posts: allPosts});

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

    response.redirect("/posts");

 }

 // Hämta specifikt inlägg - READ
exports.getPost = async function(request, response) {

    const thePost = await Post.findById(request.params.id);
    //console.log(post);
    // TODO: Felhantering 
    response.render("posts/show", {post: thePost});
}

// Hämta specifikt inlägg för uppdatera formulär - READ
exports.editFormPost = async function(request, response) {

    const thePost = await Post.findById(request.params.id);
    console.log(thePost);
    // TODO: Felhantering 

    response.render("posts/edit", {post: thePost});
}

// Uppdater specifiktt inlägg - UPDATE
exports.updatePost =  async function(request, response) {

    const title = request.body.title;
    const image = request.body.image;
    const body = request.body.body;

    const newPost = {
        title: title,
        image: image,
        body: body
    }

    await Post.findByIdAndUpdate(request.params.id, newPost);
    // TODO: Felhantering
    response.redirect("/posts/" + request.params.id);
}

// Ta bort specifikt inlägg - DELETE
  exports.deletePost = async function(request, response) {

    await Post.findByIdAndDelete(request.params.id);
    // TODO: Felhantering

    response.redirect("/posts");
}