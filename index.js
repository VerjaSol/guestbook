
var express = require('express');
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("./"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/newmessage', function(req, res){
    res.sendFile(__dirname + '/newmessage.html');
});

app.get('/ajaxmessage', function(req, res){
    res.sendFile(__dirname + '/ajaxmessage.html');
});

app.post('/guestbook', function(req, res){

    var data = require('./guestbook.json');
    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });

    var jsonStr = JSON.stringify(data);
    
    fs.writeFile('guestbook.json', jsonStr, (err) =>{
        if (err) throw err;
        console.log("It is saved");
    });

    var results = '<table border = "1"><tr><th>User</th><th>Country</th><th>Message</th> </tr>';

    for (var i=0; i< data.length; i++){
        results +=
        '<tr>'+
        '<td>'+data[i].username+'</td>'+
        '<td>'+data[i].country+'</td>'+
        '<td>'+data[i].message+'</td>'+
        '</tr>';
    }
    res.write("<style> table{font-family:Arial, Helvetica, sans-serif; border-collapse: collapse;width: 80%;padding: 20px;}\
        table td, table th {border: 1px solid #ddd; padding: 8px;}\
        table tr:nth-child(even){background-color: #f2f2f2;}\
        table tr:hover {background-color: #ddd;} </style>")
    res.write(results);
    res.end();
    
});

app.get('/guestbook', function(req, res){
    var data = require('./guestbook.json');
    var results = '<table class="table" border = "1"><tr><th>User</th><th>Country</th><th>Message</th> </tr> <h1>Guestbook</h1>';

    for (var i=0; i< data.length; i++){
        results +=
        '<tr>'+
        '<td>'+data[i].username+'</td>'+
        '<td>'+data[i].country+'</td>'+
        '<td>'+data[i].message+'</td>'+
        '</tr>';
    }
    res.write("<style> table{font-family:Arial, Helvetica, sans-serif; border-collapse: collapse;width: 80%;padding: 20px;}\
        table td, table th {border: 1px solid #ddd; padding: 8px;}\
        table tr:nth-child(even){background-color: #f2f2f2;}\
        table tr:hover {background-color: #ddd;} </style>")
    res.write(results);
    res.end();
});

app.get('*', function(req, res){
    res.send('Cannot find the page');
});

app.listen(PORT);

