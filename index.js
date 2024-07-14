
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const Character = require('./character'); 

const DB_URL = process.env.DB_URL || 'localhost';

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(DB_URL)
  .then(() => console.log('mongo ok'))
  .catch((error) => console.error('mongo error', error));



app.get('/api/characters', (req, res) => {

    try {
  
          Character.find()
            .then((chars) => res.status(200).json(chars))
            .catch((e) => {
            console.log(e);
            });
     
      } catch (error) {
        console.log(error);
      }
    

});

app.get('/api/character', async (req, res) => {
    const charId = req.query.id;
  
    try {
      const char = await Character.findOne({ id: charId }).orFail();
      res.json(char);
    } catch (error) {
      if (error.name === 'DocumentNotFoundError') {
        res.status(404).json('404 | character не найден');
      } else {
        res.status(500).json(error.message);
      }
    }
  });
  

module.exports.handler = serverless(app);
