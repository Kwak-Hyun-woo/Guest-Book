const express = require('express');
const PORT = 3001;
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded( {extended : false } )); 
app.use(cors());

// connect mysql
db.connect(function(err){
    if (err) throw err;
    else console.log("Mysql are connected!");
});

//  main api
app.post('/data', (req, res) => {
    const request = req.body["request"];

    // sql guery & param
    var insert_table = "INSERT INTO guest_book VALUES(?, ?, ?)";
    var select_all = "SELECT * FROM guest_book;";
    var clear = "TRUNCATE guest_book;";

    if (request == "INSERT"){
        console.log("INSERT");
        const name = req.body["name"];
        const date = req.body["date"];
        const content = req.body["content"];
        var params = [name, date, content];

        // check guest info in console
        console.log(name);
        console.log(date);
        console.log(content);
        console.log("--------------------------------");

        // // clear table (for debugging)
        // db.query(clear, '', function (err, results) {
        //     if (err) console.log(err);
        //     else console.log(results);
        // });

        // insert guest info to 'guest_book'(table)
        db.query(insert_table, params, function (err, results) {
            if (err) console.log(err);
            else console.log(results);
        });

        // check all table's entries
        db.query(select_all, "", function (err, all_info) {
            if (err) console.log(err);
            else {
                console.log(all_info);
            }
        });
    }

    if (request == "GUESTLIST"){
        // check all table's entries
        console.log("GUESTLIST");
        db.query(select_all, "", function (err, all_info) {
            if (err) console.log(err);
            else {
                console.log(all_info);
                res.send(all_info);
            }
        });
    }    
});

// create table 
var create_table = "CREATE TABLE guest_book(\
                    name    VARCHAR(20),\
                    date    VARCHAR(20),\
                    content VARCHAR(100));";

app.listen(PORT, function () {
    console.log('Server On: http://localhost:3001/');
});