const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors')


/* ============= start middleware =============== */
/* https://stark-savannah-83355.herokuapp.com/ */

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.nmcunxb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        client.connect()
        const UserQuizCollection = client.db("QuizsDb").collection("UserQuiz");

        /* ===============================  joy vai ================= */
        
        // Quiz post method
        app.post('/addQuiz', async (req, res) => {
            const QuizData = req.body;
            await UserQuizCollection.insertOne(QuizData);
            res.send({ success: true })

        })

        // Get Quiz  method
        app.get('/GetQuiz', async (req, res) => {
            const Quizs = await UserQuizCollection.find().toArray()
            res.send({ success: true, data: Quizs });

        })

        // get Quiz User
        app.get('/getQuiz/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await UserQuizCollection.find(query);
            res.send({ data: user })
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