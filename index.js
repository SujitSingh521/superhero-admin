const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { logger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { addID } = require('./middlewares/addID');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(logger);

// Load initial data from db.json
let db = JSON.parse(fs.readFileSync('./db.json'));

// Middleware to add ID
app.use('/add/hero', addID);

// API Endpoints

// 1. Add a new hero
app.post('/add/hero', (req, res) => {
    const newHero = req.body;
    db.heroes.push(newHero);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.status(200).json(db.heroes);
});

// 2. Retrieve details of all heroes
app.get('/heroes', (req, res) => {
    res.status(200).json(db.heroes);
});

// 3. Update villains for a hero
app.patch('/update/villain/:hero_id', auth, (req, res) => {
    const heroId = parseInt(req.params.hero_id);
    const hero = db.heroes.find(h => h.id === heroId);
    if (!hero) return res.status(404).json({ message: "Hero not found" });

    hero.villains.push(req.body);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.status(200).json(hero);
});

// 4. Delete a hero
app.delete('/delete/hero/:hero_id', auth, (req, res) => {
    const heroId = parseInt(req.params.hero_id);
    db.heroes = db.heroes.filter(h => h.id !== heroId);
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.status(200).json(db.heroes);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
