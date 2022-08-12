const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors')


/* ============= start middleware =============== */

app.use(cors())
app.use(express.json())


/* ============= start Connection =============== */


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.8ngni.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.nmcunxb.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        client.connect()
        console.log('vai mongodb')

        // All Connections
        //Add review
        // const AddReviewCollection = client.db("Review").collection("Reviewuser");
        const newAddReviewCollection = client.db("newReview").collection("newReviewuser");
        const askQuestion = client.db("newQuestion").collection("newdetailsquestion");
        // Bangla Quiz 1 Collections : 
        const BanglaQuizQusCollection1 = client.db("QuizsDb").collection("BanglaQuiz1");
        const BanglaQuizAnsCollection1 = client.db("QuizsDb").collection("BanglaQuizAns1");

        // Bangla Quiz 1 Collections : 
        const BanglaQuizQusCollection2 = client.db("QuizsDb").collection("BanglaQuiz2");
        const BanglaQuizAnsCollection2 = client.db("QuizsDb").collection("BanglaQuizAns2");




        // Bangla Quiz Data :- 1
        app.get('/GetBgQuizQs1', async (req, res) => {
            const Quizs = await BanglaQuizQusCollection1.find().toArray()
            res.send({ success: true, data: Quizs });

        })

        // Bangla Quiz post :- 1
        app.post('/BngQuiz1', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })

        // Bangla Quiz Ans Data :- 1
        app.get('/getQuizAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })




        // Bangla Quiz Data :- 2
        app.get('/GetBgQuizQs2', async (req, res) => {
            const Quizs = await BanglaQuizQusCollection2.find().toArray()
            res.send({ success: true, data: Quizs });

        })

        // Bangla Quiz post :- 2
        app.post('/BngQuiz2', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection2.insertOne(QuizData);
            res.send({ success: true })
        })

        // Bangla Quiz Ans Data :- 2
        app.get('/getQuizAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })
        app.post('/review', async (req, res) => {
            const reviewbody = req.body
            console.log(reviewbody);
            await newAddReviewCollection.insertOne(reviewbody);
            res.send({ success: true })
        })
        app.get('/review', async (req, res) => {
            const Rev = await newAddReviewCollection.find().toArray()
            res.send({ success: true, data: Rev });

        })
        app.post('/ask', async (req, res) => {
            const question = req.body
            console.log(question);
            await askQuestion.insertOne(question);
            res.send({ success: true })
        })
        app.get('/ask', async (req, res) => {
            const ask = await askQuestion.find().toArray()
            res.send({ success: true, data: ask });

        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World, How are you')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})