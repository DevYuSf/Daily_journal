const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require('lodash');



app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static("public"));

// let keyName = ["day_10","day3"];

let Daily_journal = []


app.get("/",(req,res)=>{
    res.render("index",{header:Daily_journal});
})

app.get("/about",(req,res)=>{
    res.render("about");
    
})


app.get("/contact",(req,res)=>{
    res.render("contact");
})

app.get("/soogeli",(req,res)=>{
    
    res.render("soogeli");
})

app.post("/",(req,res)=>{
    const post = {
        title:`${req.body.header}`,
        content:req.body.content
    }
   
    Daily_journal.push(post);
    // for (let i = 0; i < Daily_journal.length; i++) {
    //    console.log(Daily_journal[i].title)
        
    // }
    res.redirect("/");
})
app.get("/posts",(req,res)=>{
    res.render("posts")
})
app.get("/posts/:topic",(req,res)=>{
    let topic = _.lowerCase(req.params.topic);
    let j ;
    Daily_journal.forEach(post => {
        let head = post.title;
        if (head === topic || _.kebabCase(head) === topic) {
            j=post;
        res.render("posts",{ header :post})
        }
       // res.render("posts",{ header :post})
    });
})

app.listen(3000,()=>{
    console.log("server is starting on port 3000.");
})