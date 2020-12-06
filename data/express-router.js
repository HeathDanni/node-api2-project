const express = require("express")
const posts = require(`./db.js`)
const router = express.Router()

router.get("/api/posts", (req, res) => {
    posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error retrieving posts"
            })
        })
})

router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error retrieving post"
            })
        })
})

router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    posts.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error creating new post"
            })
        })
})

module.exports = router