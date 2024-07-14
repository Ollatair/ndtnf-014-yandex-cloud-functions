
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const Character = require('./character');
const defaultList = require('./constants');

const DB_URL = process.env.DB_URL || 'localhost';

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

try {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
      });  
    const promises = defaultList.map(async (char) => {
      const existingChar = await Character.findOne({ id: char.id });
      if (!existingChar) {
        await Character.create(char);
        console.log(`Character "${char.name}" успешно добавлена в базу данных`);
      } else {
        console.log(`Character "${char.name}" уже существует в базе данных`);
      }
    });

     Promise.all(promises);
  } catch (error) {
    console.error('Ошибка при добавлении книг:', error);
  }



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
