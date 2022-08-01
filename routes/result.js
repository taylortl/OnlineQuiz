const express = require('express');
const connection = require('./database/mysql.js');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('result')
});

// POST request to save the score of the user
router.post("/save-score/:score/:user",  (req, res) => {
    // save the choice of the user to database
    let query = `update users set score=${req.params.score} where id=${req.params.user}`;
    connection.query(query, (err) => {
      if (err) throw err;
      console.log("User's score updated");
        res.json({message: "User's score saved to database."});
    });
})

// POST request to save the name of the user
router.post("/save-username/:username/:user",  (req, res) => {
    // save the username of the user to database
    let query = `update users set username="${req.params.username}" where id=${req.params.user}`;
    connection.query(query, (err) => {
      if (err) throw err;
      console.log("User's username updated");
        res.json({message: "User's username saved to database."});
    });
})

module.exports = router;