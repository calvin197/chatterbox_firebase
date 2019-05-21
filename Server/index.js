const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const router = require('../Database/router')
// const menus = require('../database/models.js')

//require middleware
var morgan = require("morgan")

//use middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

// app.get('/', (req, res)=>{
//     res.status(200).send('success chatterbox!!!!')
// })

app.use(router)
// serve the client
app.use('/',express.static(path.join(__dirname, '../public')))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))