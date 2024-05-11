// Create web server and connect to database
// Create comments table and insert data into it
// Query data from the comments table and display it in the browser
// Create a form to insert new comments into the comments table
// Use the form to insert new comments into the comments table

// Import the express module
const express = require('express');

// Create an express application
const app = express();

// Import the mysql module
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments',
});

// Import the body-parser module
const bodyParser = require('body-parser');

// Use the body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));

// Create a table called comments
app.get('/create-table', (req, res) => {
    const sql = `
        CREATE TABLE comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            message TEXT
        )
    `;

    pool.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        }

        res.send('Comments table created');
    });
});

// Insert data into the comments table
app.get('/insert-comment', (req, res) => {
    const sql = `
        INSERT INTO comments (name, message)
        VALUES ('John Doe', 'This is a test comment')
    `;

    pool.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        }

        res.send('Comment inserted');
    });
});

// Query data from the comments table
app.get('/comments', (req, res) => {
    const sql = 'SELECT * FROM comments';

    pool.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        }

        res.send(result);
    });
});

// Display the comments in the browser
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM comments';

    pool.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        }

        let comments = '';

        result.forEach(comment => {
            comments += `<h3>${comment.name}</h3>`;
            comments += `<p>${comment