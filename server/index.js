const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const { Job, Resume } = require('./models/schema.js');
const upload = multer({ dest: "uploads/" });

main().then(() => console.log("Connection successful")).catch(err => console.error(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skillbridge');
}

// POST a new job
app.post('/jobs', async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a resume with file upload
app.post("/resumes", upload.single("file"), async (req, res) => {
  try {
    const { name, email, skills } = req.body;
    const resume = await Resume.create({
      name,
      email,
      skills: JSON.parse(skills)
    });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET matched resumes based on job ID
app.get("/match/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    const resumes = await Resume.find();

    const matches = resumes.map((r) => {
      const common = r.skills.filter((s) => job.skills.includes(s));
      return { ...r.toObject(), score: common.length };
    });

    matches.sort((a, b) => b.score - a.score);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
