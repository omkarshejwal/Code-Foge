const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'index.html';
const client = new MongoClient(url, { useUnifiedTopology: true });

app.post('/signin', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection('users').findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, 'SECRET_KEY');
      res.header('auth-token', token).send(token);
    } else {
      res.send('Invalid password');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log('Server started'));
