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

app.get("/", (req, res) => {
   res.send("Try Out server running");
});

app.listen(port, () => {
   console.log(`try out server running on ${port}`);
});
