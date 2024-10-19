// index.js
const express = require("express");
const fs = require("fs");
const logger = require("./middlewares/logger");
const heroRoutes = require("./routes/heroRoutes");

const app = express();
app.use(express.json());
app.use(logger);

// Routes
app.use(heroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
