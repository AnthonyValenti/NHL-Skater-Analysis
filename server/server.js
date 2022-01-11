//Imports and server setup
const { response } = require('express');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://user:password@cluster1.bvl6p.mongodb.net/nhldata?retryWrites=true&w=majority"; //user and password removed, use working link in readme
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
require("dotenv").config();

app.listen(process.env.PORT || 5501, () => console.log('listening at 5501'));
app.use('/',express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5502');
    next();
});
getData();


async function getData(){
    try{
        app.get('/api', async (req, res) => {
            await client.connect();
            const dataArr = [];
            const collection = client.db("nhldata").collection("players");
            collection.find().forEach(function(doc) {
                dataArr.push(doc);
            }, function(err) {
                res.json(dataArr);
            });
        });
    } catch(e){
        console.log(e);
    } finally{
        await client.close();
    }
}

