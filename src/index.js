const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose');
const {connection} = require('./connector');

const isNullOrUndefined = val=> val===null || val===undefined;
app.get("/findColleges",async(req,res)=>{
    const name= req.query.name;
    const state=req.query.state;
    const city= req.query.city;
    const course=req.query.course;
    const exams=req.query.exams;
    let findClg= await connection.find();
    if(!isNullOrUndefined(name)){
    let regex = new RegExp(name, 'i')
    findClg= await connection.find({name: {$regex: regex}});
    }
    if(!isNullOrUndefined(state)){
    let regex = new RegExp(state, 'i')
    findClg= await connection.find({state: {$regex: regex}});
    }
    if(!isNullOrUndefined(city)){
    let regex = new RegExp(city, 'i')
    findClg= await connection.find({city: {$regex: regex}});
    }
    if(!isNullOrUndefined(course)){
    let regex = new RegExp(course, 'i')
    findClg= await connection.find({course: {$regex: regex}});
    }
    
    res.send(findClg);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;