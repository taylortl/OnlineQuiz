const express = require('express');
const connection = require('./database/mysql.js');
const router = express.Router();

router.get("/history", (req, res) => {
    // get question with given id = random_id
    let query = `select * from users`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("Records fetched from database");
        console.log(result);
        
        // pass to client
        return res.json({record: result});
    });
});

router.get("/", (req, res) => {
    res.render('record')
});

module.exports = router;