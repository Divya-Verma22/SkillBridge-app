import React, { useState } from "react";
import MatchResult from "./MatchResult";
import ResumeForm from "./Resumeform";
import JobForm from "./JobForm";
import "./Cascanding.css"
import { Container, Typography, Box } from "@mui/material";

export default function App() {
  const [jobId, setJobId] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#00e5ff",
            mb: 2,
            textShadow: "0px 0px 6px rgba(0, 229, 255, 0.4)",
          }}
        >
          SkillBridge
        </Typography>

        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ color: "#ccc", mb: 4 }}
        >
          A Smart Job Manager to Match Skills with Opportunities
        </Typography>

        <JobForm setJobId={setJobId} />
        <ResumeForm />

        {jobId && (
          <Box sx={{ mt: 4 }}>
            <MatchResult jobId={jobId} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
