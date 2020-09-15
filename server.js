const express = require('express')
const app = express();
const server = require('http').Server(app)

app.get('/' , (req,res) => {
    res.send('<h1>Aashim<h1>')
})

server.listen(3000)