import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from 'cors';
import knex from 'knex';
import HandleRegister from './controllers/HandleRegister.js';
import HandleSignIn from "./controllers/HandleSignIn.js";
import HandleProfileGet from './controllers/HandleProfileGet.js';
import HandleImage from './controllers/HandleImage.js';
import HandleApiCall  from './controllers/HandleApiCall.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('success');
});

app.post("/signin", (req, res) => {
  HandleSignIn(req, res, db, bcrypt)
});

app.post("/register", (req, res) => {
  HandleRegister(req, res, db, bcrypt)
});

app.get("/profile/:id", (req, res) => {
  HandleProfileGet(req, res, db)
});

app.put("/image", (req, res) => {
  HandleImage(req, res, db)
});

app.post("/imageurl", (req, res) => {
  HandleApiCall(req, res)
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app is runnning on port ${port}`);
});
