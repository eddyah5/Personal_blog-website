//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "The Journey during the tutorial with Dr. Angela Yu was exciting and challenging also which made it the more interesting. It's amazing how the internet and it's numerous web technologies has evolved over the years to something so power that our daily lives in the 21st Century is glued to it. I hope to have a job one day in this area and hopefully enjoy the majical career especially in Data Science and Machine learning. First, because it's an amazing opportunity, I feel like it is a gift. Data science and machine learning are the areas I was fascinated with and wanted to dive into later on in my tech journey. After much study, I feel like it is time to finally decide the trajectory of my journey in tech, and I believe that Wichnich Data Science Academy will help me kick start this dream.";
const aboutContent = "I am a passionate person who loves to build (do) things with creative and innovative ideas behind them. I have a strong affinity for new ideas and experiences. A graduate of Electrical Electronics Engineering, working as a GPS Officer and  coding out of passion. I love it when I transfer knowledge, the experience is mind-blowing for me. Also, teaching is a two-way process.";
const contactContent = "Please feel free to drop a line @ Linkedin: linkedin.com/in/editoro-godwin/ ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
