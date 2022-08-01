const express = require('express');
const connection = require('./database/mysql.js');
const router = express.Router();

/* GET for quiz/random_id (first in and next button click) */ 
router.get("/:ques_id", (req, res) => {
  // get question with given id = random_id
  let query = `select question from questions where id=${req.params.ques_id}`;
  let question = null;
  connection.query(query, (err, result) => {
     if (err) throw err;
     console.log("Question fetched from database");
     console.log(result);
     question = result;
     
     // get choices for the corresponding question
     query = `select id, choice, is_answer from question_choices where question_id=${req.params.ques_id}`;
     let choices =  null;
     connection.query(query, (err, result) => {
      if (err) throw err;
      console.log("Choices fetched from database");
      console.log(result);
      choices = result;

      // pass to client
      return res.json({question: question, choices : choices});
     });
  });
})

router.get("/", (req, res) => {
  let query = 'select count(*) from questions';
  let numQuest = null, userID = null;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Number of questions fetched from database:");
    numQuest = JSON.parse(JSON.stringify(result));
    numQuest = numQuest[0]["count(*)"].toString();
    console.log(numQuest);
    ;
    
    query = 'insert into users (username) values("temp")';
    connection.query(query, (err, result) => {
      query = 'select id from users where username="temp"';
      connection.query(query, (err, result) => {
        query = 'select id from users where username="temp"';
        console.log("User ID fetched from database:");
        userID = JSON.parse(JSON.stringify(result));
        userID = userID[0]["id"].toString();
        console.log(userID);
        return res.render('quiz.ejs', {numQuestion: numQuest, user: userID});
      });
    });
 });
})

 
/* POST for  quiz/random_id (choices click) */
router.post("/:ques_id/:user/:choice",  (req, res) => {
  // get the choice id  (pass from request query)
  // save the choice of the user to connection
  let query = `insert into user_answers (user_id, question_id, choice_id) 
               values(${req.params.user},${req.params.ques_id},${req.params.choice})`;
  connection.query(query, (err) => {
    if (err) throw err;
    console.log("User's answer saved into database");
    query = `update user_answers set is_correct = 
          (select is_answer from question_choices where question_id = ${req.params.ques_id} and id = ${req.params.choice})
          where user_id = ${req.params.user} and question_id = ${req.params.ques_id} and choice_id = ${req.params.choice}`;
    connection.query(query, (err) => {
      if (err) throw err;
      console.log("Updated information about the correctness");

      res.json({message: "User's answer saved to database."});
    });
  });
})

 
module.exports = router;