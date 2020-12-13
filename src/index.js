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
    const minPackage=req.query.minPackage;
    const maxFees=req.query.maxFees;
    let findClg="";
    if(!isNullOrUndefined(name)){
    // let regex = new RegExp(name, 'i')
    findClg= await connection.find({name: {$regex: name, $options: "i"}});
    }
    if(!isNullOrUndefined(state)){
    let regex = new RegExp(state, 'i')
    findClg= await connection.find({state: {$regex: state, $options: "i"}});
    }
    if(!isNullOrUndefined(city)){
    let regex = new RegExp(city, 'i')
    findClg= await connection.find({city: {$regex: city, $options: "i"}});
    }
    if(!isNullOrUndefined(course)){
    const regex=`^${course}$`
    findClg= await connection.find({course: {$regex: regex, $options: "i"}});
    }
    if(!isNullOrUndefined(minPackage)){
    const data=await connection.find();
    findClg=data.filter((d)=>d.minPackage>=10.5);
    }
    if(!isNullOrUndefined(maxFees)){
        const data=await connection.find();
        findClg=data.filter((d)=>d.maxFees<=10);
    }
    res.send(findClg);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;