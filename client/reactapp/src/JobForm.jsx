
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function JobForm({ setJobId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false); // For showing loading state during submission
  const [error, setError] = useState(""); // To handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset any previous error

    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          skills: skills.split(",").map((s) => s.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to post job");

      const data = await res.json();
      setJobId(data._id);
      setTitle(""); // Reset title
      setDescription(""); // Reset description
      setSkills(""); // Reset skills

      alert("Job posted successfully");
    } catch (err) {
      setError("An error occurred while posting the job. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

return(
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
  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
    Post a Job
  </Typography>
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
  >
    <TextField
      label="Title"
      name="title"
      fullWidth
      variant="outlined"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
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
  label="Description"
  name="description"
  fullWidth
  multiline
  rows={4}
  sx={{
    mb: 2,
    input: { color: "#fff" },
    label: { color: "#aaa" },
    textarea: { color: "#fff" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#555",
      },
      "&:hover fieldset": {
        borderColor: "#888",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00e5ff",
      },
      backgroundColor: "#1e1e2f",
    },
  }}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
/>

    <TextField
      label="Skills (comma-separated)"
      name="skills"
      fullWidth
      variant="outlined"
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
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
    {error && (
      <Typography color="error" sx={{ mt: 1 }}>
        {error}
      </Typography>
    )}
    <Button
      variant="contained"
      type="submit"
      disabled={loading}
      sx={{
        mt: 2,
        py: 1.5,
        background: "linear-gradient(45deg, #00bcd4, #1de9b6)",
        color: "#000",
        fontWeight: "bold",
        "&:hover": {
          background: "linear-gradient(45deg, #1de9b6, #00bcd4)",
        },
      }}
    >
      {loading ? "Posting..." : "Post Job"}
    </Button>
  </Box>
</Paper>


)
}
