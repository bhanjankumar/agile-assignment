const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const List = require('./database/models/list');
const Track = require('./database/models/track');
app.use(express.json());


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/tracks",(req,res)=>{
    Track.find({})
    .then(tracks=>res.send(tracks))
    .catch((error)=>console.log(error));
})

app.get("/tracks/:trackId",(req,res)=>{
    Track.find({_id:req.params.trackId})
    .then(tracks=>res.send(tracks))
    .catch((error)=>console.log(error));
})

app.patch("/tracks/:trackId",(req,res)=>{
    Track.findOneAndUpdate({_id:req.params.trackId},{$set:req.body})
    .then(tracks=>res.send(tracks))
    .catch((error)=>console.log(error));
})

app.post("/tracks",(req,res)=>{
    (new Track({date:req.body.date,income:req.body.income,amount:req.body.amount,summary:req.body.summary}))
    .save()
    .then((traks)=>res.send(traks))
    .catch((error)=>console.log(error));
})

app.listen(5000,()=>{
    console.log('server connected on ports 5000');
})