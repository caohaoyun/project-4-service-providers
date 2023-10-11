const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('new_database2.db');

app.use(express.static('public')); // Serve static files from a "public" folder

app.get('/api/your-api-endpoint', (req, res) => {
    const selectedState = req.query.state;

    if (!selectedState) {
        res.status(400).json({ error: 'State not provided' });
        return;
    }

    const tableName = selectedState.toLowerCase(); // Assuming table names are in lowercase

    const sql = `SELECT DISTINCT bed FROM "${tableName}"`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            const uniqueBedroomValues = rows.map(row => row.bed);
            res.json(uniqueBedroomValues);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});