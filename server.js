const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

let app = express();
let db = new sqlite3.Database('proyecto-backend');

// db.run('CREATE TABLE tasks(id int AUTO_INCREMENT, description varchar(255))');
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/pendientes', function(req, res) {
    console.log(req.body)
    db.run(`INSERT INTO tasks(description) VALUES(?)`, req.body.description);
    res.send(`Hola! ${req.body.description} fue agregada.`);
});

process.on('SIGINT', function() {
    console.log('Adios')
    db.close();
    process.exit();
})

app.set('view engine', 'ejs');

app.use('/public', express.static('public'))

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/saludo', function(req, res) {
    console.log(req.query)
    db.run(`INSERT INTO tasks(description) VALUES(?)`, req.query.description);
    res.send(`Hola ${req.query.description}`);
});

app.post('/', function(req, res) {
    console.log(req.body)
    res.send(`Hola ${req.body.name}`);
});



app.listen(3000);