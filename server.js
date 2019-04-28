const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

const admins = require ('./routes/api/admin');

const app = express ();

// BodyParser middleware

app.use (bodyParser.urlencoded ({extended: false}));
app.use (bodyParser.json ());

// database config

const db = require ('./config/keys').mongoURI;

// Connect to database

mongoose
  .connect (db)
  .then (() => console.log ('MongoDB connected'))
  .catch (err => console.log (err));
app.get ('/', (req, res) => res.send ('hello'));

app.use ('/api/admin', admins);

const port = process.env.PORT || 4000;

app.listen (port, () => console.log ('Server running.....'));
