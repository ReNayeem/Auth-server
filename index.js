const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://auth:2JaTCqPvdLXrR4jg@cluster0.2bsdr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {

    await client.connect();
    const userCollection = client.db('auth').collection('users');

    //all users
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });

    //get user by email
    app.get('/userByEmail', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);

    });
  }
  finally {

  }

}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Auth server Running');
});

app.listen(port, () => {
  console.log('Listening to port', port);
})