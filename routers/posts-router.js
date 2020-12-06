const express = require("express")
const posts = require(`../data/db.js`)
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
        .then((post) => {
            if (post.id) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: "The post information could not be retrieved."
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
                error: "There was an error while saving the post to the database"
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

    router.delete("/api/posts/:id", (req, res) => {
        posts.remove(req.params.id)
            .then((post) => {
                if (post) {
                    res.status(200).json({
                        message: `Post ${req.params.id} was removed`
                    })
                } else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist."
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: "The post could not be removed"
                })
            })
    })


    //Help!  I don't know to check if the post with this id exists in this call

    router.get("/api/posts/:id/comments", (req, res) => {
        posts.findPostComments(req.params.id)
         .then((comments) => {
            //  if (!posts.postId) {
            //      return res.status(404).json({
            //         message: "The post with the specified ID does not exist."
            //      })
            //  }
             res.status(200).json(comments)
         })
         .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
         })
    })

    router.get("/api/posts/:postId/comments/:commentId", (req, res) => {
        //for some reason get request only takes the id of the comment.  However, when it is working fine in insomnia
        posts.findCommentById(req.params.commentId)
            .then((comment) => {
                if (comment) {
                    res.json(comment)
                } else {
                    res.status(400).json({
                        message: "Comment was not found"
                    })
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: "could not get comment"
                })
            })
    })

    // router.post("/api/posts/:postId/comments", (req, res) => {
    //     if (!req.body.comment) {
    //         return res.status(400).json({
    //             errorMessage: "Please provide text for the comment."
    //         })
    //     }

    //     posts.insertComment(req.body.comment)
    //         .then((comment) => {
    //             res.status(201).json(comment)
    //         })
    //         .catch((err) => {
    //             res.status(500).json({
    //                 error: "There was an error while saving the comment to the database"
    //             })
    //         })
    // })

module.exports = router