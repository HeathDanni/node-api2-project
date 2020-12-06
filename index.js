const express = require("express")
const server = express()
const postsRouter = require("./data/posts-router")

server.use(express.json())
server.use(postsRouter)

server.get("/", (req, res) => {
    res.json({message: "hello world"})
})

server.listen(8080, () => {
    console.log("server is running")
})