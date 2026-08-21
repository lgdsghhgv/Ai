import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Node.js Backend Server for Resume AI is running!',
    timestamp: new Date().toISOString(),
  });
});

// Example Resume AI API Route
app.post('/api/generate-resume', async (req, res) => {
  try {
    const { name, role, experience, skills } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: 'Name and Role are required fields.' });
    }

    // Dummy AI Generation response (ready for OpenAI / Gemini API integration)
    const generatedResume = {
      summary: `Experienced ${role} with a strong background in ${skills ? skills.join(', ') : 'software development'}. Proven track record in delivery and technical execution.`,
      experience: experience || [],
      skills: skills || [],
    };

    res.json({
      success: true,
      data: generatedResume,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate resume.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Node.js server running on http://localhost:${PORT}`);
});
