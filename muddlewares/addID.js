// middlewares/addID.js
const fs = require("fs");

const addID = (req, res, next) => {
    const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const lastHero = db.heroes[db.heroes.length - 1];
    const newID = lastHero ? lastHero.id + 1 : 1;
    req.body.id = newID;
    next();
};

module.exports = addID;
