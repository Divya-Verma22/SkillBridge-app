const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String]
});

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String]
});

const Job = mongoose.model("Job", jobSchema);
const Resume = mongoose.model("Resume", resumeSchema);

module.exports = { Job, Resume };

