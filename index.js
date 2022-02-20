// Basic Working,

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');


const port = process.env.PORT || 7000;


//Middleware Work,

app.use(cors());
app.use(express.json());



// Functionally Working,


// Calling User and password with .env,

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// creating a client in MongoClient,

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





console.log(uri);


// Work on Async Function used in data,
async function runerw() {


    // try Mothed,

    try {
        await client.connect();
        const database = client.db('eay-world');
        const cameraCollection = database.collection('security-camera');
        const singlePageCollection = database.collection('SinglePage');
        const reviewCollection = database.collection('review');



        // creating an array in eay-world used security-camera,
        app.get('/security-camera', async (req, res) => {

            const cursor = cameraCollection.find({});
            const Categorywise = await cursor.toArray();
            res.send(Categorywise);

        });


        // creating an array in eay-world used security-camera,
        app.get('/singlepage', async (req, res) => {

            const cursor = singlePageCollection.find({});
            const singlepageywise = await cursor.toArray();
            res.send(singlepageywise);

        });


        app.post('/review', async(req, res) => {
            const review = req.body;
            const orderreview =  await reviewCollection.insertOne(review);
            console.log(orderreview);
            res.send(orderreview)
        
        });


        
        app.get('/review', async(req , res) => {
            const cursor = reviewCollection.find({});
            const review = await cursor.toArray();
            res.send(review);
          
          })
















    }
    finally {
        //  await client.close();
    }
}




runerw().catch(console.dir);





app.get('/', (req, res) => {
    res.send('security-camera')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})