// routes/heroRoutes.js
const express = require("express");
const fs = require("fs");
const router = express.Router();
const addID = require("../middlewares/addID");
const auth = require("../middlewares/auth");

// POST: Add a new hero
router.post("/add/hero", addID, (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        db.heroes.push(req.body);
        fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
        res.status(201).json(db.heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Retrieve all heroes
router.get("/heroes", (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        res.status(200).json(db.heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH: Update villains for a hero
router.patch("/update/villain/:hero_id", auth, (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        const hero = db.heroes.find(h => h.id === parseInt(req.params.hero_id));

        if (!hero) {
            return res.status(404).json({ message: "Hero not found" });
        }

        hero.villains.push(req.body);
        fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
        res.status(200).json(hero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Delete a hero
router.delete("/delete/hero/:hero_id", auth, (req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        const heroIndex = db.heroes.findIndex(h => h.id === parseInt(req.params.hero_id));

        if (heroIndex === -1) {
            return res.status(404).json({ message: "Hero not found" });
        }

        db.heroes.splice(heroIndex, 1);
        fs.writeFileSync("./db.json", JSON.stringify(db, null, 2));
        res.status(200).json(db.heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
