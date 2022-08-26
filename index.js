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

// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.8ngni.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

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
        const askComment = client.db("newComment").collection("detailscomment");
        const Topicnew = client.db("AllTopic").collection("perTopic");
        const Votedata = client.db("AllVote").collection("Pervote");
        const Reactdata = client.db("AllReact").collection("perReact");
        const UserColllection=client.db("user").collection("perUser");
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
        // profile update 
        app.put('/userprofile/:email', async (req, res) => {
            const body = req.body
      
            const email=req.params.email
      
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
              $set: { name: body.name ,
                email:body.email,
                desc:body.desc,
                address:body.address,
                phone:body.phone,
                country:body.country,
                age:body?.age,
                Birthdate:body?.date,  
            }
      
            };


            const result = await UserColllection.updateOne(filter,updateDoc,options);
            res.send({ result });
   
          })

          app.get('/userprofile', async (req, res) => {
            const user = await UserColllection.find().toArray()
            res.send({ success: true, data: user });

        })
          app.get('/userprofile/:email', async (req, res) => {
            const email=req.params.email
           const  query = { email: email }
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
        app.post('/check',async(req,res)=>{
            const fetch = require('node-fetch');

const encodedParams = new URLSearchParams();


const url = 'https://dnaber-languagetool.p.rapidapi.com/v2/check';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '157b7f57b0msh5d5f20acfc8da8cp1129e6jsn8ad2b297eedf',
    'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
  },
  params: {text: req.body.text, language: 'en-US'}
};

fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err));
        })
        // app.post('/react', async (req, res) => {
        //     const react = req.body
        //     console.log(react);
        //     await Reactdata.insertOne(react);
        //     res.send({ success: true })
        // })
        // app.get('/react/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { id: id }
        //     const react = Reactdata.find(query);
        //     const result = await react.toArray()
        //     res.send(result)
        // })
        // app.get('/react', async (req, res) => {
        //     const to = await Reactdata.find().toArray()
        //     res.send(to);

        // })
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