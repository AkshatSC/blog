//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var _ = require('lodash');//for handling kababcase(akshat-singh-chouhan)

const homeStartingContent = "Welcome folks to my blog website. See all the sports related blogs below and find when will virat's 71st century be coming.";
const aboutContent = "My name is Akshat singh chouhan. i had done B.tech from lakshmi narain College of technology bhopal in the field on information technology. i m currently placed in Infosys DSE role. Love to write sports blogs.";
const contactContent = "email : akshatsinghchouhan16@gmail.com   phone : +919406602302.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); //look for Css file and other resources inside public folder.


let posts = [];

app.get("/", function(req, res) {
  res.render("home.ejs", {
    homeContent: homeStartingContent,
    posts: posts,
  });
})

app.get("/about", function(req, res) {
  res.render("about.ejs", {
    aboutContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact.ejs", {
    contactContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose.ejs");
})

app.post("/compose", function(req, res) {
  //making JS object

  const post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postname", function(req, res) { //xxxx is parameter
  const requestedTitle = _.lowerCase(req.params.postname);
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.postTitle);
    if (storedTitle == requestedTitle){
      // console.log("match found");
      res.render("post.ejs",{title:post.postTitle,content:post.postBody})
    }
  })
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
