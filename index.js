
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.set('views');
app.set('view engine', 'ejs');


// ------------CREATE DB CONNECTION------------
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port: 8889,
    database:'Test'
})


db.connect((err, data) =>{
    if(err){
        throw err;
        console.log("Error connecting to the database");
    }
    console.log("data base connected");
})
// ------------CREATE DB CONNECTION------------



// ------------HTTP ROUTES------------
app.get('/' , (req,res) =>{
    res.render('main');
})

app.get('/add', (req,res) =>{
    res.render('add');
})

app.post('/submit',  (req,res) =>{
    var sueldo = 7.25;
    var str = "INSERT INTO `MyHours`(`hours`) VALUES (" + req.body.data + ");";
    db.query(str, (err, result) =>{
        if (err) {
            throw err;
        }
        console.log("----DATA SAVED TO DATABASE: " + req.body.data + "-----");
    })
    res.render('saved');
    
})

app.get('/show', (req,res) =>{
    var str = 'SELECT * FROM MyHours;';
    db.query(str, (err, data) =>{
        if (err) {
            throw err;
        }
        console.log("------SHOWING DATA IN DATABASE-------")
        console.log(data);
        console.log("------SHOWING DATA IN DATABASE-------")
    })
    res.render('show');
})

// ------------HTTP ROUTES------------





// ------------STARTING THE SERVER------------
app.listen(3000 ,() => {
    console.log('server running');
})





// ------------MY QUERIES------------

// SELECT hours, hours * 7.25 as totalMoney FROM MyHours;

// ------------MY QUERIES------------
