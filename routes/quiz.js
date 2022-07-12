const express = require('express');
const db = require('./database/mysql.js');
const router = express.Router();

/* GET for quiz/user_id/random_id (first in and next button click) */ 
router.get("/:user_id/:ques_id", async (req, res) => {
  // get question with given id = random_id
  const query = `select question from questions where id=${req.params.ques_id};`;
  const question = await db.executeQuery(query);
  // get choices for the corresponding question
  query = `select id, choice, is_answer from question_choices where question_id=${req.params.ques_id};`;
  const choices = await db.executeQuery(query);
  // pass to client  
  return res.json({question: question, choices : choices});
})

router.get("/", (req, res) => {
  res.render('quiz');
  const query = 'select count(*) from questions';
  return res.json({noQuestion: db.executeQuery(query)});
})

 
/* POST for  quiz/user_id/random_id (choices click) */
router.post("/:user_id/:ques_id", async (req, res) => {
  // get the choice id  (pass from request query)
  // save the choice of the user to db
  let query = `insert into user_answers (user_id, question_id, choice_id) 
               values(${req.params.user_id},${req.params.ques_id},${req.query.choice});`;
  await db.executeQuery(query);
  query = `update user_answers set is_correct = 
          (select is_answer from question_choices where question_id = ${req.params.ques_id} and id = ${req.query.choice})
          where user_id = ${req.params.user_id} and question_id = ${req.params.ques_id} and choice_id = ${req.query.choice};`;
  await db.executeQuery(query);
  // get the new random_id (pass from request query)
  // redirect to quiz/user_id/new_random_id
  res.redirect(`/${req.params.user_id}/${req.query.random_id}`);
})


module.exports = router;