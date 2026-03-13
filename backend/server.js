const express = require('express'); 
const cors = require('cors');
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
    res.type('application/json');
    console.log("GET /users");
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/users/:id', (req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        const user = JSON.parse(data).find(item => item.id == req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).end();
        }
    });
});

app.get('/recipes',(req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/recipes.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/recipes/:id', (req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/recipes.json', 'utf8', (err, data) => {
        const recipe = JSON.parse(data).find(item => item.id == req.params.id);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).end();
        }
    });
});

const server = app.listen(3000, '127.0.0.1', () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("listening at http://%s:%s", host, port);
});