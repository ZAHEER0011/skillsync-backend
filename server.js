const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: "*", // Allow all origins (replace with your frontend URL in production)
  methods: "GET,POST", // Allow specific HTTP methods
}));

// Load the quizzes JSON file
let quizzes;
try {
  quizzes = JSON.parse(fs.readFileSync(path.join(__dirname, 'quizzes.json'), 'utf-8'));
} catch (error) {
  console.error("Error reading or parsing quizzes.json:", error);
  process.exit(1); // Exit the server if the file can't be read or parsed
}

// API endpoint to fetch questions by skill
app.get('/api/questions/:skill', (req, res) => {
  const skill = req.params.skill.toLowerCase();
  console.log(`Fetching quizzes for skill: ${skill}`); // Debug: Log the skill
  if (quizzes[skill]) {
    console.log(`Quizzes found:`, quizzes[skill]); // Debug: Log the quizzes
    res.json(quizzes[skill]);
  } else {
    console.log(`Skill not found: ${skill}`); // Debug: Log if skill is not found
    res.status(404).json({ error: 'Skill not found' });
  }
});

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});