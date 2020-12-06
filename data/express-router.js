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
                error: "The posts information could not be retrieved."
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
                message: "The post with the specified ID does not exist."
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

router.put("/api/posts/:id", (req, res) => {
        if (!req.body.title || !req.body.contents) {
            return res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }
    posts.update(req.params.id, req.body)
        .then((post) => {
            if (post) {
                res.status(200).json(req.body)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
    })

module.exports = router