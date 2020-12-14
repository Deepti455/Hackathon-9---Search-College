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
    const {name,city,state,exam,course}= req.query;
    
    const minPackage=(req.query.minPackage && !isNullOrUndefined(req.query.minPackage)? parseInt(req.query.minPackage): 0);
    const maxFees=(req.query.maxFees && !isNullOrUndefined(req.query.maxFees)? parseInt(req.query.maxFees): 1000);
    
    const data= await connection.find({
        "name": new RegExp(name,"i"),
        "city": new RegExp(city, "i"),
        "state": new RegExp(state,"i"),
        "exam": new RegExp(exam, "i"),
        "course": new RegExp(course, "i"),
        "maxFees": {$lte: maxFees},
        "minPackage": {$gte: minPackage}
    });

    res.send(data);

    // let findClg=await connection.find();
    // if(!isNullOrUndefined(name)){
    // // let regex = new RegExp(name, 'i')
    // findClg= await connection.find({name: {$regex: name, $options: "i"}});
    // }
    // if(!isNullOrUndefined(state)){
    // let regex = new RegExp(state, 'i')
    // findClg= await connection.find({state: {$regex: state, $options: "i"}});
    // }
    // if(!isNullOrUndefined(city)){
    // let regex = new RegExp(city, 'i')
    // findClg= await connection.find({city: {$regex: city, $options: "i"}});
    // }
    // if(!isNullOrUndefined(course)){
    // const regex=`^${course}$`
    // findClg= await connection.find({course: {$regex: regex, $options: "i"}});
    // }
    // if(!isNullOrUndefined(minPackage)){
    // const data=await connection.find();
    // findClg=data.filter((d)=>d.minPackage>=minPackage);
    // }
    // if(!isNullOrUndefined(maxFees)){
    //     const data=await connection.find();
    //     findClg=data.filter((d)=>d.maxFees<=maxFees);
    // }
    // res.send(findClg);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;