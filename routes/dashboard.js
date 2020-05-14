const express = require("express");
const router = express.Router();
const {ensureAuthenticated} =require("../config/auth")
const User = require("../models/Users")
const Article = require("../models/Articles");
const flash = require('connect-flash');
const session = require('express-session');

// Dashboard
router.get("/", (req, res) => {
    res.send("works")
})

var email="";

router.get('/:email', ensureAuthenticated, (req, res) => {
    email = req.params.email;
    // console.log(req.body)
    User.findOne({email:email}, function(err, doc){
      // console.log(doc._id)
      const articles = doc.articles;
      res.render("./articles/index", {articles : doc.articles})
    })
});
  
// handelling new article
router.get("/articles/new", (req, res) => {
    // console.log("i was triggered insinde the new route");
    User.findOne({email:email}, (err, doc)=>{
        // console.log("inside get doc = ", doc);
        if(doc != null){
            res.render("articles/new", {
                article: new Article()
            });
        }else{
            res.redirect("/users/login")
        }
    })    
})
router.post("/articles/neww", async (req, res) => {
    User.findOne({email:email}, (err, doc) => {
        // console.log("indide post doc = ", doc);
        if (doc != null){
            var newArticle = new Article({
                title: req.body.title,
                description: req.body.description,
                markdown: req.body.markdown,
                email:email
            });
            // console.log("New Article = ", newArticle);
            doc.articles.unshift(newArticle);
            // console.log(doc);
            doc.save()
                .then(console.log("new article was saved"));
            req.flash('success_msg', 'New Article Created');
            res.redirect("/dashboard/"+email);
        }else{
            res.redirect("/users/login")
        }
    })
})


// handelling the readmore
router.get("/articles/:id", (req, res) => {
    const id = req.params.id;
    User.findOne({email:email}, (err, doc) => {
        if (doc != null){
            for (article of doc.articles){
                if (article._id == id){
                    res.render("./articles/show", {article:article} )
                }
            }
        }
    })
})

// handelling the delete route
router.get("/articles/delete/:id", (req, res) => {
    const id = req.params.id;
    User.findOne({email:email}, (err, doc) => {
        if (doc != null){
            doc.articles = doc.articles.filter((article) => {
                return article._id != id;
            });

            doc.save().then(() => {
                // console.log(doc.articles)
                console.log("Deleted successfully");
                req.flash('success_msg', 'Article Deleted');
                res.redirect("/dashboard/" + email);
            })   
        }else{
            colsole.log("in delete the doc was not found");
        }
    })    
})



// handelling the edit
router.get("/articles/edit/:id", (req, res) => {
    const id = req.params.id;
    User.findOne({email:email}, (err, doc) => {
        if (err) {console.log(err)}
        if (doc != null){
            // console.log(doc)
            for (article of doc.articles){
                if (article._id == id){
                    // console.log(article)
                    res.render("./articles/edit", {article:article});
                }
            }   
        }else{
            console.log("In the edit route empty doc was returned")
        }
    })
})
router.post("/articles/edit", (req, res) => {
    User.findOne({email:email}, (err, doc) => {
        id = req.body.id;
        // console.log(id)
        // console.log(doc.articles.length);
        for(var i=0; i < doc.articles.length; i++ ) {
            // console.log("insde for" , doc.articles[i])
            if (doc.articles[i]._id == id){

                // console.log("before", doc.articles[i])
                doc.articles[i].title = req.body.title;
                doc.articles[i].description = req.body.description;
                doc.articles[i].markdown = req.body.markdown;
                // console.log("After",doc.articles[i])
                doc.save()
                    .then(() => {
                        console.log("Updated successfully");
                        req.flash('success_msg', 'Article edited');
                        res.redirect("/dashboard/"+email);
                    }) 
            }
        }
        // console.log("out of the for loop")
    })
    // console.log("falling out of the callback")
})

module.exports = router;