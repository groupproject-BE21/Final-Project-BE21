const express = require ('express');
const bodyParser = require ('body-parser');
const sequelize = require ('sequelize');
const { userInfo } = require('os')

const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const port= 3030


app.listen(port, () =>{
    console.log(`This application Run on Port : ${port}`)
})

//
app.get("/", (req, res) =>{
    res.send("SELAMAT DATANG DI DI FINAL PROJECT FE40-BE21")
})


app.post("/register", (req, res) =>{
})

app.post("/login", (req, res) =>{
})

app.post("/article", (req, res) =>{
})

app.get("/article", (req, res) =>{
})

app.post("/register/:id", (req, res) =>{  
})

app.put("/register/:id", (req, res) =>{
})

app.put("/register/:id", (req, res) =>{
})