import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function ResumeForm({ onResumeSubmit }) {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    skills: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid resume file (PDF, DOC, DOCX).");
        setResume({ ...resume, file: null });
        return;
      }
      setError("");
      setResume({ ...resume, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume.file) {
      setError("Please upload a resume file.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", resume.name);
    formData.append("email", resume.email);
    formData.append(
      "skills",
      JSON.stringify(resume.skills.split(",").map((s) => s.trim()))
    );
    formData.append("file", resume.file);

    try {
      const res = await fetch("http://localhost:5000/resumes", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      alert("Resume submitted successfully");

      setResume({ name: "", email: "", skills: "", file: null });
      if (onResumeSubmit) onResumeSubmit();
    } catch (err) {
      console.error("Submit error:", err.message);
      setError("Failed to submit resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        mb: 4,
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Submit Resume
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={resume.name}
          onChange={handleChange}
          required
          sx={{
            input: { color: "#fff" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
            },
          }}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={resume.email}
          onChange={handleChange}
          required
          sx={{
            input: { color: "#fff" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
            },
          }}
        />
        <TextField
          label="Skills (comma-separated)"
          name="skills"
          fullWidth
          value={resume.skills}
          onChange={handleChange}
          required
          sx={{
            input: { color: "#fff" },
            label: { color: "#aaa" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
            },
          }}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{
            color: "#00e5ff",
            borderColor: "#00e5ff",
            "&:hover": {
              borderColor: "#1de9b6",
              backgroundColor: "rgba(0, 229, 255, 0.08)",
            },
          }}
        >
          Upload Resume File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: -1 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{
            mt: 1,
            py: 1.5,
            background: "linear-gradient(45deg, #00bcd4, #1de9b6)",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(45deg, #1de9b6, #00bcd4)",
            },
          }}
        >
          {loading ? "Submitting..." : "Submit Resume"}
        </Button>
      </Box>
    </Paper>
  );
}




