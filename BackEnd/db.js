// we will connect to mongodb here

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/'  // connecting string to connect to mongodb

// connecting ot mongodb 
const connectToMongo = ()=>{

    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo successfully');
    })
}

module.exports = connectToMongo;  // now it can be acesscible outside