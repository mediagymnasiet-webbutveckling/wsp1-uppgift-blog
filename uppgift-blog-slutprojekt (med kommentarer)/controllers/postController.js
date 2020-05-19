
const Post = require("./../models/postModel");
const Comment = require("./../models/commentModel");

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

    const author = {
           id: request.user._id,
           username: request.user.username
    }

    const newPost = {
        title: title,
        image: image,
        body: body,
        author: author
    }

    await Post.create(newPost);
    // TODO: Felhantering 

    response.redirect("/posts");

 }

 // Hämta specifikt inlägg - READ
exports.getPost = async function(request, response) {

    const thePost = await Post.findById(request.params.id).populate("comments");
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

// Visa formulär för att skapa ny kommentar för specifikt inlägg
exports.showFormForComment = async function(request, response) {
    
    const thePost = await Post.findById(request.params.id);

    // Renderera ut specifkt inlägg i comments/new.ejs
    response.render("comments/new", {post: thePost});

}

exports.createCommentByPost = async function(request, response) {

    const post = await Post.findById(request.params.id);
  
    const author = {
        id: request.user._id,
        username: request.user.username
    }

    const newComment = {
        text: request.body.text,
        author: author
    }


    await Comment.create(newComment, function(error, comment) {
        if(error) {
            console.log(error);
        } else {
            comment.save();
            post.comments.push(comment);
            post.save();
            response.redirect("/posts/" + post._id);
        }

    });


}