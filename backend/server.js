const express = require('express'); 
const cors = require('cors');
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(cors());

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
       res.json({ id: user.id, username: user.username, email: user.email, isAdmin: user.admin });
   })
});

app.post("/auth/register", (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        favorites: [],
        admin: false
    };
    const filename = __dirname + "/users.json";

    res.type("application/json");
    fs.readFile(filename, (err, data) => {
        const users = JSON.parse(data);
        user.id = users.length + 1;
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
            res.json({
                id: users[index].id,
                username: users[index].username,
                email: users[index].email
            })
            res.status(201).end();
        });
    });
});

app.get("/favorites/:id", (req, res) => {
    res.type("application/json");
    fs.readFile(__dirname + "/users.json", (err, data) => {
        const user = JSON.parse(data).find(user => user.id === +req.params.id);
        if (!user) {
            res.status(401).end();
            return;
        }
        res.send(user.favorites);
    });
});

app.post("/switch-favorites/:id", (req, res) => {
    const usersFilename = __dirname + "/users.json";
    const recipesFilename = __dirname + "/recipes.json";

    fs.readFile(recipesFilename, (err, data) => {
        const recipe = JSON.parse(data).find(item => item.id === +req.params.id);
        if (!recipe) res.status(404).end();
    });

    fs.readFile(usersFilename, (err, data) => {
        if (err) return res.sendStatus(500);

        const users = JSON.parse(data);
        const index = users.findIndex(u => u.id === req.body.id);

        if (index < 0) return res.sendStatus(404);

        let newFavorites = [];
        users[index].favorites.forEach(fav => {
            if (fav !== +req.params.id) {
                newFavorites.push(fav);
            }
        });
        if (users[index].favorites.length === newFavorites.length) newFavorites.push(+req.params.id);
        users[index].favorites = newFavorites;

        fs.writeFile(usersFilename, JSON.stringify(users, null, 4), err => {
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

app.post("/recipes/create", (req, res) => {
    const recipe = {
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imagePath: req.body.imagePath
    };
    const filename = __dirname + "/recipes.json";

    res.type("application/json");
    fs.readFile(filename, (err, data) => {
        const recipes = JSON.parse(data);
        recipe.id = recipes.length + 1;
        recipes.push(recipe);
        fs.writeFile(filename, JSON.stringify(recipes, null, 4), err => {
            if (err) return res.sendStatus(500);
            res.status(201).end();
        });
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

app.get("/many-recipes", (req, res) => {
    fs.readFile(__dirname + "/recipes.json", "utf8", (err, data) => {
        if (err) return res.status(500).send(err);

        const ids = req.query.ids;
        const requestedIds = Array.isArray(ids)
            ? ids.map(Number)
            : String(ids).split(",").map(Number);

        const recipes = JSON.parse(data).filter(item => requestedIds.includes(item.id));
        res.json(recipes);
    });
});

const server = app.listen(3000, '127.0.0.1', () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("listening at http://%s:%s", host, port);
});