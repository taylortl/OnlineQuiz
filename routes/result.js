const express = require('express');
const connection = require('./database/mysql.js');
const router = express.Router();

router.get("/:user")

router.get("/", (req, res) => {
    res.render('result')
});

// post request to save the score of the user
router.post("/:score/:user",  (req, res) => {
    // save the choice of the user to connection
    let query = `update users set score = ${req.params.score} where id=${req.params.user}`;
    connection.query(query, (err) => {
      if (err) throw err;
      console.log("User's score updated");
        res.json({message: "User's score saved to database."});
    });
})

module.exports = router;