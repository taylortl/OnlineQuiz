const express = require('express');
const path = require('path');
const app = express();
const db = require('./routes/database/mysql.js');
const quizRouter = require('./routes/quiz');
const resultRouter = require('./routes/result');
const recordRouter = require('./routes/record');

db.connectDB()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
// app.use('/html', express.static(__dirname + '/public/html'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/quiz', quizRouter);
app.use('/result', resultRouter);
app.use('/record', recordRouter);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/get_record', (req, res) => {
    res.render('record');
})


app.listen(3000);


