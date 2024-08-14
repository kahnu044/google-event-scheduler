const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

// Routes
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Welcome to our backend Server"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});