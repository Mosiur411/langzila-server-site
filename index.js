const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors')


/* ============= start middleware =============== */

app.use(cors())
app.use(express.json())


/* ============= start Connection =============== */
const uri = `mongodb+srv://${process.env.USER_NAMEL}:${process.env.USER_PASSL}@cluster0.f91lokn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        client.connect()
        console.log('vai mongodb')

        // All Connections
        // Bangla Easy Quiz Ans Collections : 
        const BanglaQuizAnsCollection1 = client.db("QuizsDb").collection("BanglaQuizAns1");
        const BanglaQuizAnsCollection2 = client.db("QuizsDb").collection("BanglaQuizAns2");
        const BanglaQuizAnsCollection3 = client.db("QuizsDb").collection("BanglaQuizAns3");
        const BanglaQuizAnsCollection4 = client.db("QuizsDb").collection("BanglaQuizAns4");
        const BanglaQuizAnsCollection5 = client.db("QuizsDb").collection("BanglaQuizAns5");

        // Bangla Medium Quiz Ans Collections : 
        const BanglaMediumQuizAnsCollection1 = client.db("QuizsDb").collection("BanglaMediumQuizAns1");
        const BanglaMediumQuizAnsCollection2 = client.db("QuizsDb").collection("BanglaMediumQuizAns2");
        const BanglaMediumQuizAnsCollection3 = client.db("QuizsDb").collection("BanglaMediumQuizAns3");
        const BanglaMediumQuizAnsCollection4 = client.db("QuizsDb").collection("BanglaMediumQuizAns4");
        const BanglaMediumQuizAnsCollection5 = client.db("QuizsDb").collection("BanglaMediumQuizAns5");

        // Bangla Hard Quiz Ans Collections : 
        const BanglaHardQuizAnsCollection1 = client.db("QuizsDb").collection("BanglaHardQuizAns1");
        const BanglaHardQuizAnsCollection2 = client.db("QuizsDb").collection("BanglaHardQuizAns2");
        const BanglaHardQuizAnsCollection3 = client.db("QuizsDb").collection("BanglaHardQuizAns3");
        const BanglaHardQuizAnsCollection4 = client.db("QuizsDb").collection("BanglaHardQuizAns4");
        const BanglaHardQuizAnsCollection5 = client.db("QuizsDb").collection("BanglaHardQuizAns5");

        // Hindi Easy Quiz Ans Collections : 
        const HindiQuizAnsCollection1 = client.db("QuizsDb").collection("HindiEasyQAns1");
        const HindiQuizAnsCollection2 = client.db("QuizsDb").collection("HindiEasyQAns2");
        const HindiQuizAnsCollection3 = client.db("QuizsDb").collection("HindiEasyQAns3");
        const HindiQuizAnsCollection4 = client.db("QuizsDb").collection("HindiEasyQAns4");

        // Hindi Medium Quiz Ans Collections : 
        const HindiMediumQuizAnsCollection1 = client.db("QuizsDb").collection("HindiMediumQAns1");
        const HindiMediumQuizAnsCollection2 = client.db("QuizsDb").collection("HindiMediumQAns2");
        const HindiMediumQuizAnsCollection3 = client.db("QuizsDb").collection("HindiMediumQAns3");
        const HindiMediumQuizAnsCollection4 = client.db("QuizsDb").collection("HindiMediumQAns4");

        // Hindi Hard Quiz Ans Collections : 
        const HindiHardQuizAnsCollection1 = client.db("QuizsDb").collection("HindiHardQAns1");
        const HindiHardQuizAnsCollection2 = client.db("QuizsDb").collection("HindiHardQAns2");
        const HindiHardQuizAnsCollection3 = client.db("QuizsDb").collection("HindiHardQAns3");
        const HindiHardQuizAnsCollection4 = client.db("QuizsDb").collection("HindiHardQAns4");
        const HindiHardQuizAnsCollection5 = client.db("QuizsDb").collection("HindiHardQAns5");

        // English Hard Quiz Ans Collections : 
        const EnglishEasyQuiAnszCollection1 = client.db("QuizsDb").collection("EnglishEasyQAns1");
        const EnglishEasyQuiAnszCollection2 = client.db("QuizsDb").collection("EnglishEasyQAns1");
        const EnglishEasyQuiAnszCollection3 = client.db("QuizsDb").collection("EnglishEasyQAns1");
        const EnglishEasyQuiAnszCollection4 = client.db("QuizsDb").collection("EnglishEasyQAns1");
        const EnglishEasyQuiAnszCollection5 = client.db("QuizsDb").collection("EnglishEasyQAns1");

        // Event Data Collections : 
        const eventCollections = client.db("eventDB").collection("EventData");


        //Add review
        const newAddReviewCollection = client.db("newReview").collection("newReviewuser");
        const askQuestion = client.db("newQuestion").collection("newdetailsquestion");
        const askComment = client.db("newComment").collection("detailscomment");
        const Topicnew = client.db("AllTopic").collection("perTopic");
        const Votedata = client.db("AllVote").collection("Pervote");
        const UserColllection = client.db("user").collection("perUser");
        const UserCall = client.db("Alluser").collection("role");




        // Event Data post :- 1
        app.post('/eventData', async (req, res) => {
            const EventData = req.body;
            await eventCollections.insertOne(EventData);
            res.send({ success: true })
        })



        // UPDATE USER AND CREATE TOKEN
        app.patch('/eventData/:email', async (req, res) => {
            const email = req.params.email;
            const EventData = req.body;
            const course = EventData.course
            const filter = { email: email, course: course }
            const option = { upsert: true }
            const updateDoc = {
                $set: EventData,
            };
            const result = await eventCollections.updateOne(filter, updateDoc, option)
            res.send({ success: true, data: result });
        })


        // get Event data
        app.get('/eventData/:email/:course', async (req, res) => {
            const email = req.params.email;
            const course = req.params.course
            if (email || course) {
                const param = { email: email, course: course }
                const result = await eventCollections.findOne(param)
                res.send({ success: true, data: result })
            }
        })


        // Delete Event data
        app.delete('/eventDelete/:email/:course', async (req, res) => {
            const email = req.params.email;
            const course = req.params.course;

            if (email || course) {
                const param = { email: email, course: course }
                const result = await eventCollections.deleteOne(param);
                console.log(result)
                res.send({ data: result })
            }
        })

        // get Event data
        app.get('/eventData/:email', async (req, res) => {
            const email = req.params.email;
            const data = eventCollections.find({ email: email })
            const result = await data.toArray()
            res.send({ data: result })

        })




        // Bangla Easy Quiz post :- 1
        app.post('/BngQuiz1', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Easy Quiz Ans Data :- 1
        app.get('/getQuizAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Bangla Easy Quiz post :- 2
        app.post('/BngQuiz2', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection2.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Easy Quiz Ans Data :- 2
        app.get('/getQuizAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Bangla Easy Quiz post :- 3
        app.post('/BngQuiz3', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Easy Quiz Ans Data :- 3
        app.get('/getQuizAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })




        // Bangla Easy Quiz post :- 4
        app.post('/BngQuiz4', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Easy Quiz Ans Data :- 4
        app.get('/getQuizAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Easy Quiz post :- 5
        app.post('/BngQuiz5', async (req, res) => {
            const QuizData = req.body;
            await BanglaQuizAnsCollection5.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Easy Quiz Ans Data :- 5
        app.get('/getQuizAns5/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaQuizAnsCollection5.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Bangla Medium Quiz post :- 1
        app.post('/BngMdQuiz1', async (req, res) => {
            const QuizData = req.body;
            await BanglaMediumQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Medium Quiz Ans Data :- 1
        app.get('/getMdQuizAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaMediumQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Medium Quiz post :- 2
        app.post('/BngMdQuiz2', async (req, res) => {
            const QuizData = req.body;
            await BanglaMediumQuizAnsCollection2.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Medium Quiz Ans Data :- 2
        app.get('/getMdQuizAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaMediumQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Medium Quiz post :- 3
        app.post('/BngMdQuiz3', async (req, res) => {
            const QuizData = req.body;
            await BanglaMediumQuizAnsCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Medium Quiz Ans Data :- 3
        app.get('/getMdQuizAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaMediumQuizAnsCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Medium Quiz post :- 4
        app.post('/BngMdQuiz4', async (req, res) => {
            const QuizData = req.body;
            await BanglaMediumQuizAnsCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Medium Quiz Ans Data :- 4
        app.get('/getMdQuizAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaMediumQuizAnsCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Medium Quiz post :- 5
        app.post('/BngMdQuiz5', async (req, res) => {
            const QuizData = req.body;
            await BanglaMediumQuizAnsCollection5.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Medium Quiz Ans Data :- 5
        app.get('/getMdQuizAns5/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaMediumQuizAnsCollection5.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })




        // Bangla Hard Quiz post :- 1
        app.post('/BangHardQ1', async (req, res) => {
            const QuizData = req.body;
            await BanglaHardQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })

        // Bangla Hard Quiz Ans Data :- 1
        app.get('/BangHardQAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaHardQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Hard Quiz post :- 2
        app.post('/BangHardQ2', async (req, res) => {
            const QuizData = req.body;
            await BanglaHardQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Hard Quiz Ans Data :- 2
        app.get('/BangHardQAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaHardQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Bangla Hard Quiz post :- 3
        app.post('/BangHardQ3', async (req, res) => {
            const QuizData = req.body;
            await BanglaHardQuizAnsCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Hard Quiz Ans Data :- 3
        app.get('/BangHardQAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaHardQuizAnsCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Bangla Hard Quiz post :- 4
        app.post('/BangHardQ4', async (req, res) => {
            const QuizData = req.body;
            await BanglaHardQuizAnsCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Hard Quiz Ans Data :- 4
        app.get('/BangHardQAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaHardQuizAnsCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Bangla Hard Quiz post :- 5
        app.post('/BangHardQ5', async (req, res) => {
            const QuizData = req.body;
            await BanglaHardQuizAnsCollection5.insertOne(QuizData);
            res.send({ success: true })
        })
        // Bangla Hard Quiz Ans Data :- 5
        app.get('/BangHardQAns5/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = BanglaHardQuizAnsCollection5.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })




        // Hindi Hindi Hindi Hindi Hindi Hindi Hindi Hindi Hindi Hindi Hindi Hindi Hindi

        // Hindi Easy Quiz post :- 1
        app.post('/hindiEasyQ1', async (req, res) => {
            const QuizData = req.body;
            await HindiQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Easy Quiz Ans Data :- 1
        app.get('/hindiEasyQAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Easy Quiz post :- 2
        app.post('/hindiEasyQ2', async (req, res) => {
            const QuizData = req.body;
            await HindiQuizAnsCollection2.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Easy Quiz Ans Data :- 2
        app.get('/hindiEasyQAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Hindi Easy Quiz post :- 3
        app.post('/hindiEasyQ3', async (req, res) => {
            const QuizData = req.body;
            await HindiQuizAnsCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Easy Quiz Ans Data :- 3
        app.get('/hindiEasyQAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiQuizAnsCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Easy Quiz post :- 4
        app.post('/hindiEasyQ4', async (req, res) => {
            const QuizData = req.body;
            await HindiQuizAnsCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Easy Quiz Ans Data :- 4
        app.get('/hindiEasyQAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiQuizAnsCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Hindi Medium Quiz post :- 1
        app.post('/hindiMediumQ1', async (req, res) => {
            const QuizData = req.body;
            await HindiMediumQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Medium Quiz Ans Data :- 1
        app.get('/hindiMediumQAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiMediumQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Medium Quiz post :- 2
        app.post('/hindiMediumQ2', async (req, res) => {
            const QuizData = req.body;
            await HindiMediumQuizAnsCollection2.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Medium Quiz Ans Data :- 2
        app.get('/hindiMediumQAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiMediumQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Medium Quiz post :- 3
        app.post('/hindiMediumQ3', async (req, res) => {
            const QuizData = req.body;
            await HindiMediumQuizAnsCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Medium Quiz Ans Data :- 3
        app.get('/hindiMediumQAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiMediumQuizAnsCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Medium Quiz post :- 4
        app.post('/hindiMediumQ4', async (req, res) => {
            const QuizData = req.body;
            await HindiMediumQuizAnsCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Medium Quiz Ans Data :- 4
        app.get('/hindiMediumQAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiMediumQuizAnsCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Hard Quiz post :- 1
        app.post('/hindiHardQ1', async (req, res) => {
            const QuizData = req.body;
            await HindiHardQuizAnsCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 1
        app.get('/hindiHardQAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiHardQuizAnsCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Hindi Hard Quiz post :- 2
        app.post('/hindiHardQ2', async (req, res) => {
            const QuizData = req.body;
            await HindiHardQuizAnsCollection2.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 2
        app.get('/hindiHardQAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiHardQuizAnsCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Hindi Hard Quiz post :- 3
        app.post('/hindiHardQ3', async (req, res) => {
            const QuizData = req.body;
            await HindiHardQuizAnsCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 3
        app.get('/hindiHardQAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiHardQuizAnsCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Hard Quiz post :- 4
        app.post('/hindiHardQ4', async (req, res) => {
            const QuizData = req.body;
            await HindiHardQuizAnsCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 4
        app.get('/hindiHardQAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiHardQuizAnsCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Hard Quiz post :- 5
        app.post('/hindiHardQ5', async (req, res) => {
            const QuizData = req.body;
            await HindiHardQuizAnsCollection5.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 5
        app.get('/hindiHardQAns5/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = HindiHardQuizAnsCollection5.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })





        // English Easy Quiz post :- 1
        app.post('/englishEasyQ1', async (req, res) => {
            const QuizData = req.body;
            await EnglishEasyQuiAnszCollection1.insertOne(QuizData);
            res.send({ success: true })
        })
        // English Easy Quiz Ans Data :- 1
        app.get('/englishEasyQAns1/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = EnglishEasyQuiAnszCollection1.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Hard Quiz post :- 2
        app.post('/englishEasyQ2', async (req, res) => {
            const QuizData = req.body;
            await EnglishEasyQuiAnszCollection2.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 2
        app.get('/englishEasyQAns2/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = EnglishEasyQuiAnszCollection2.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Hard Quiz post :- 3
        app.post('/englishEasyQ3', async (req, res) => {
            const QuizData = req.body;
            await EnglishEasyQuiAnszCollection3.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 3
        app.get('/englishEasyQAns3/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = EnglishEasyQuiAnszCollection3.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })


        // Hindi Hard Quiz post :- 4
        app.post('/englishEasyQ4', async (req, res) => {
            const QuizData = req.body;
            await EnglishEasyQuiAnszCollection4.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 4
        app.get('/englishEasyQAns4/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = EnglishEasyQuiAnszCollection4.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })



        // Hindi Hard Quiz post :- 5
        app.post('/englishEasyQ5', async (req, res) => {
            const QuizData = req.body;
            await EnglishEasyQuiAnszCollection5.insertOne(QuizData);
            res.send({ success: true })
        })
        // Hindi Hard Quiz Ans Data :- 5
        app.get('/englishEasyQAns5/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const AnsData = EnglishEasyQuiAnszCollection5.find(query);
            const result = await AnsData.toArray()
            res.send({ data: result })
        })

        // End Joy Code


        // Adding Review
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
        // profile update 
        app.put('/userprofile/:email', async (req, res) => {
            const body = req.body

            const email = req.params.email

            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: body.name,
                    email: body.email,
                    desc: body.desc,
                    address: body.address,
                    phone: body.phone,
                    country: body.country,
                    age: body?.age,
                    Birthdate: body?.date,
                }

            };


            const result = await UserColllection.updateOne(filter, updateDoc, options);
            res.send({ result });

        })

        app.get('/userprofile', async (req, res) => {
            const user = await UserColllection.find().toArray()
            res.send({ success: true, data: user });

        })
        app.get('/userprofile/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const user = await UserColllection.findOne(query)
            res.send(user);

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
        app.post('/comment', async (req, res) => {
            const comment = req.body
            console.log(comment);
            await askComment.insertOne(comment);
            res.send({ success: true })
        })
        app.get('/comment', async (req, res) => {
            const to = await askComment.find().toArray()
            res.send({ success: true, data: to });

        })
        app.get('/comment/:id', async (req, res) => {
            const id = req.params.id;
            const query = { id: id }
            const commentData = askComment.find(query);
            const result = await commentData.toArray()
            res.send({ data: result })
        })
        app.get('/topic', async (req, res) => {
            const to = await Topicnew.find().toArray()
            res.send({ success: true, data: to });

        })
        app.get('/topic/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const topicDAta = Topicnew.find(query);
            const result = await topicDAta.toArray()
            res.send({ data: result })
        })
        app.post('/topic', async (req, res) => {
            const topic = req.body
            console.log(topic);
            await Topicnew.insertOne(topic);
            res.send({ success: true })
        })
        app.get('/vote', async (req, res) => {
            const to = await Votedata.find().toArray()
            res.send(to);

        })
        app.post('/vote', async (req, res) => {
            const vote = req.body
            console.log(vote);
            await Votedata.insertOne(vote);
            res.send({ success: true })
        })
        app.get('/vote/:id', async (req, res) => {
            const id = req.params.id;
            const query = { id: id }
            const vote = Votedata.find(query);
            const result = await vote.toArray()
            res.send(result)
        })

        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            console.log(user);

            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,

            };
            const result = await UserCall.updateOne(filter, updateDoc, options);
            res.send({ result });
        })


        app.get('/admin/:email', async (req, res) => {
            const email = req.params.email;
            const findAdmin = await UserCall.findOne({ email: email })



            const isAdmin = findAdmin?.role === 'admin' || "false";
            res.send({ admin: isAdmin })
        })

        app.put('/user/admin/:email', async (req, res) => {
            const email = req.params.email;


            const filter = { email: email };

            const updateDoc = {
                $set: { role: "admin" },

            };

            const result = await UserCall.updateOne(filter, updateDoc);
            res.send({ result });



        })
        app.get('/roleuser', async (req, res) => {
            const to = await UserCall.find().toArray()
            res.send(to);

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