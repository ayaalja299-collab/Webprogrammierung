const express = require('express'); 
const cors = require('cors');
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(cors());

/*
app.get('/users', (req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/users/:id', (req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        const user = JSON.parse(data).find(item => item.id === +req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).end();
        }
    });
});
 */

app.post("/auth/login", (req, res) => {
   res.type("application/json");
   fs.readFile(__dirname + "/users.json", (err, data) => {
       const user = JSON.parse(data).find(user => user.username === req.body.username);
       if (!user) {
           res.status(401).end();
           return;
       }
       if (user.password !== req.body.password) {
           res.status(401).end();
           return;
       }
       res.json({ id: user.id, username: user.username, email: user.email });
   })
});

app.post("/auth/register", (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    const filename = __dirname + "/users.json";

    res.type("application/json");
    fs.readFile(filename, (err, data) => {
        const users = JSON.parse(data);
        user.id = users.length;
        if (users.find(u => u.username === user.username)) {
            res.status(401).end("Username already exists");
            return;
        }
        if (users.find(u => u.email === user.email)) {
            res.status(401).end("Email already exists");
            return;
        }
        users.push(user);
        fs.writeFile(filename, JSON.stringify(users, null, 4), err => {
            if (err) return res.sendStatus(500);
            res.status(201).end();
        });
    })
});

app.post("/auth/changeAccountInfo", (req, res) => {
    const filename = __dirname + "/users.json";

    fs.readFile(filename, "utf8", (err, data) => {
        if (err) return res.sendStatus(500);

        const users = JSON.parse(data);
        const index = users.findIndex(u => u.id === req.body.id);

        if (index < 0) return res.sendStatus(404);

        if (users[index].password !== req.body.password) {
            return res.sendStatus(401);
        }

        if (req.body.newUsername) users[index].username = req.body.newUsername;
        if (req.body.newEmail) users[index].email = req.body.newEmail;
        if (req.body.newPassword) users[index].password = req.body.newPassword;

        fs.writeFile(filename, JSON.stringify(users, null, 4), err => {
            if (err) return res.sendStatus(500);
            res.status(201).end();
        });
    });
});

app.get('/recipes', (req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/recipes.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/recipes/:id', (req, res) => {
    res.type('application/json');
    fs.readFile(__dirname + '/recipes.json', 'utf8', (err, data) => {
        const recipe = JSON.parse(data).find(item => item.id === +req.params.id);
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