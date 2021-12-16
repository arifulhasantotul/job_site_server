const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nebgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

async function run() {
   try {
      await client.connect();
      console.log("connected to db");

      const database = await client.db("job_sites_data");
      const userCollection = database.collection("users");

      //  user GET, POST, PUT
      app.route("/users")
         .get(async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
         })
         .post(async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.json(result);
         })
         .put(async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await userCollection.updateOne(
               filter,
               updateDoc,
               options
            );
            res.json(result);
         });
   } finally {
      // await client.close();
   }
}

run().catch(console.dir);

app.get("/", (req, res) => {
   res.send("Try Out server running");
});

app.listen(port, () => {
   console.log(`try out server running on ${port}`);
});
