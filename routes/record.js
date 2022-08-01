const express = require('express');
const connection = require('./database/mysql.js');
const router = express.Router();

// GET request to fetch all the records from the database 
router.get("/history", (req, res) => {
    // get all the saved users
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