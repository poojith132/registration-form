const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const users = [];
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.post('/submit-login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send(`Welcome back, ${username}!`);
    } else {
        res.send('Invalid credentials. Please try again.');
    }
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration-form.html'));
});
app.post('/submit-registration', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        res.send('Username already exists. Please choose a different username.');
    } else {
        users.push({ username, password });
        res.send('Registration successful. Please <a href="/login">log in now</a>.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
