const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/articles/search", function (req, res) {
    const query = req.body.keyword;
    Article.findOne({ title: query })
        .then(foundArticle => {
            if (foundArticle) {
                res.render("article", { article: foundArticle });
            } else {
                res.send("No articles found matching the keyword.");
            }
        })
        .catch(err => {
            console.log(err);
            res.send("An error occurred while searching for the article.");
        });
});


app.listen(3300, function () {
    console.log("Server started on port 3300");
});


/* 

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/articles", function (req, res) {

    const query = req.body.Keyword;
    const url = http://localhost:3300/articles;

    app.get(function (req, res) {
        Article.find()
            .then(function (foundArticles) {
                console.log(foundArticles);
                res.send(foundArticles);
            })
            .catch(function (err) {
                console.log(err);
            });
    })

});

//////////////////////////// Requesting Targetting All Articles //////////////////////////////////

app.route("/articles")

    .get(function (req, res) {
        Article.find()
            .then(function (foundArticles) {
                console.log(foundArticles);
                res.send(foundArticles);
            })
            .catch(function (err) {
                console.log(err);
            });
    })

    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save()
            .then(function () {
                res.send("Successfully added a new article.");
            })
            .catch(function (err) {
                res.render(err);
            });
    })

    .delete(function (req, res) {
        Article.deleteMany()
            .then(function () {
                res.send("Successfully deleted all articles.");
            })
            .catch(function (err) {
                res.render(err);
            });
    });


////////////////////////////////////////////// Requesting Targetting all Articles ///////////////////////////////////////

app.route("/articles/:articleTitle")

    .get(function (req, res) {

        Article.findOne({ title: req.params.articleTitle })
            .then(function (foundArticle) {
                console.log(foundArticle);
                res.send(foundArticle);
            })
            .catch(function () {
                res.send("NO articles matching that etitle was found.");
            });
    })


    .put(function (req, res) {
        Article.replaceOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content }
        )
            .then(function (result) {
                // Handle the result or send a response
                res.send("Article updated successfully.");
            })
            .catch(function (error) {
                // Handle the error or send an error response
                res.send("Error updating the article: " + error);
            });
    })


    /* .put(async (req, res) => {
        try {
            await Article.updateOne(
                { title: req.params.articleTitle },
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                    }
                }
            );
            res.send("Article Updated");
        } catch (err) {
            console.log(err);
        }
    }) */

/* .patch(function (req, res) {

    Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body },
    )
        .then(function (result) {
            // Handle the result or send a response
            res.send("Article updated successfully.");
        })
        .catch(function (error) {
            // Handle the error or send an error response
            res.send("Error updating the article: " + error);
        });
})

.delete(function (req, res) {

    Article.deleteOne(
        { title: req.params.articleTitle },
    )
        .then(function (result) {
            // Handle the result or send a response
            res.send("Article updated successfully.");
        })
        .catch(function (error) {
            // Handle the error or send an error response
            res.send("Error updating the article: " + error);
        });
});


app.listen(3300, function () {
console.log("Server started on port 3300");
});
*/


