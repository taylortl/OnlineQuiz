const express = require('express');
const db = require('./database/mysql');
const router = express.Router();



/* GET for quiz/user_id/random_id (first in and next button click) */ 
router.get("/:user_id/:ques_id", async (req, res) => {
  // get question with given id = random_id
  let query = `select question from questions where id=${req.params.ques_id};`;
  let question = await execute_query(query);
  // get choices for the corresponding question
  query = `select id, choice, is_answer from question_choices where question_id=${req.params.ques_id};`;
  let choices = await execute_query(query);
  // pass to client  
  res.json({question: question, choices : choices});
})

router.get("/", async (req, res) => {
  let query = 'select COUNT(*) from questions;';
  let ques_len = execute_query(query);
  res.json({len : ques_len});
})

 
/* POST for  quiz/user_id/random_id (choices click) */
router.post("/:user_id/:ques_id", async (req, res) => {
  // get the choice id  (pass from request query)
  // save the choice of the user to db
  let query = `insert into user_answers (user_id, question_id, choice_id) 
               values(${req.params.user_id},${req.params.ques_id},${req.query.choice});`;
  await execute_query(query);
  query = `update user_answers set is_correct = 
          (select is_answer from question_choices where question_id = ${req.params.ques_id} and id = ${req.query.choice})
          where user_id = ${req.params.user_id} and question_id = ${req.params.ques_id} and choice_id = ${req.query.choice};`;
  await execute_query(query);
  // get the new random_id (pass from request query)
  // redirect to quiz/user_id/new_random_id
  res.redirect(`/${req.params.user_id}/${req.query.random_id}`);
})


function execute_query(query) {
  let data = db.query(query, (err, result) => {
                  if (err) throw err;
                  return result; });
  return data;
}

module.exports = router;