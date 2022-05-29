const express = require('express');
const app = express();
const quizRouter = require('./routes/quiz');
const resultRouter = require('./routes/result');
const recordRouter = require('./routes/record');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/quiz', quizRouter);
app.use('/result', resultRouter);
app.use('/record', recordRouter);

app.get('/', (req, res) => {
    res.render('index');
})


app.listen(3000);


