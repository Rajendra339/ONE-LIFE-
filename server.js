const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to provide data
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// API route to handle feedback submission
const feedbacks = []; // Store feedback temporarily in memory
app.post('/submit-feedback', (req, res) => {
    const { name, feedback } = req.body;
    if (name && feedback) {
        feedbacks.push({ name, feedback });
        res.status(201).json({ success: true, message: 'Feedback submitted successfully!' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid data!' });
    }
});

// API route to get feedbacks
app.get('/api/feedbacks', (req, res) => {
    res.json(feedbacks);
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Resource not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
