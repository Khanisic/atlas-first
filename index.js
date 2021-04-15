const express = require('express');
const mongodb = require("mongodb");
require("dotenv").config();
 //const dbUrl = "mongodb://127.0.0.1:27017";
const app = express();

const port = process.env.PORT || 4000

const mongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectID;

const dbUrl = process.env.DB_URL;
console.log(process)
// R0BTo4171uqkeANY
app.use(express.json());
app.listen(port, () => console.log("App is running"));

app.get('/display', async(req,res) =>{
    try{
        let clientInfo = await mongoClient.connect(dbUrl);
        let db =  clientInfo.db("first_db");
        let data = await db.collection("users")
        .find()
        .toArray();
        res.status(200).json(data);
        clientInfo.close();
    }
    catch(error){
        console.log(error);
    }
});

app.post("/create-mentor", async ( req , res) =>{
    try {
        console.log("obe")
        let client = await mongoClient.connect(dbUrl);
        console.log("tbe")
        let db = client.db("first_db")
        await db.collection("users").insertOne(req.body);
        res.status(200).json({message : "User  Created"})
        client.close();
    } catch (error) {
        console.log(error)
    }
})










