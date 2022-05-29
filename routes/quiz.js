const express = require('express');
const db = require('./database/mysql');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('quiz')
});


  /* GET for quiz/username/random_id (first in and next button click) */ 
  router.get("/:user_id/:ques_id", async (req, res) => {
    // get question with given id = random_id
    let query = `select question from questions where id=${req.params.ques_id}}`;
    let question = await execute_query(query);
    // get choices for the corresponding question
    query = `select choice, is_answer from question_choices where question_id=${req.params.ques_id}}`;
    let choices = await execute_query(query);
    // pass to client  
    res.json({question: question, choices : choices});
  })
   

  /* POST for  quiz/username/random_id (choices click) */
  router.post("/:user_id/:ques_id", async (req, res) => {
    // get the choice id from body (pass from client request)
    // save the choice of the user to db
    // get the new random_id (pass from client request)
    // redirect to quiz/new_random_id
    
  })
  


  function execute_query(query) {
    let data = db.query(query, (err, result) => {
                    if (err) throw err;
                    return result;
                });
    return data;
  }


module.exports = router;