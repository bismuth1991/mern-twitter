const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const bodyParser = require('body-parser');
const { mongoURI } = require('./config/keys');

const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/tweets', tweets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
