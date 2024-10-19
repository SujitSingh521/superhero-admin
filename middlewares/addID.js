const fs = require('fs');

const addID = (req, res, next) => {
    const db = JSON.parse(fs.readFileSync('./db.json')); // Load the database
    const lastHeroId = db.heroes.length > 0 ? db.heroes[db.heroes.length - 1].id : 0;
    req.body.id = lastHeroId + 1;
    next();
};

module.exports = {
    addID,
};
