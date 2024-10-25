const express = require('express');
const dotenv = require('dotenv');
// import { MongoClient } from 'mongodb'
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');

const cors = require('cors')

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express();
const port = 3000;
app.use(cors());

// console.log(process.env) // remove this after you've confirmed it is working



app.use(bodyparser.json())

// console.log(process.env.MONGO_URI);

client.connect();

// Getting passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Saving passwords
app.post('/', async (req, res) => { 
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult});
})

// Deleting passwords
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result:findResult});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
}) 
