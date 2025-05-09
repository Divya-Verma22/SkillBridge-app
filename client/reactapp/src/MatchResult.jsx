// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   LinearProgress,
//   Box,
// } from "@mui/material";

// export default function MatchResult({ jobId }) {
//   const [matches, setMatches] = useState([]);

//   useEffect(() => {
//     async function fetchMatches() {
//       try {
//         const res = await fetch(`http://localhost:5000/match/${jobId}`);
//         if (!res.ok) throw new Error("Failed to fetch matches");
//         const data = await res.json();
//         setMatches(data);
//       } catch (err) {
//         console.error("Error fetching match results:", err);
//       }
//     }

//     fetchMatches();
//   }, [jobId]);

//   return (
//     <Paper
//       elevation={6}
//       sx={{
//         p: 4,
//         backgroundColor: "#1e1e2f",
//         color: "#ffffff",
//         borderRadius: 3,
//         boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
//       }}
//     >
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
//         Matched Resumes
//       </Typography>
//       <List>
//         {matches.map((match, idx) => (
//           <ListItem
//             key={idx}
//             sx={{
//               mb: 2,
//               border: "1px solid #333",
//               borderRadius: 2,
//               backgroundColor: "#2a2a3d",
//               p: 2,
//             }}
//           >
//             <ListItemText
//               primary={
//                 <Typography variant="subtitle1" sx={{ color: "#00e5ff" }}>
//                   {match.name} ({match.email})
//                 </Typography>
//               }
//               secondary={
//                 <>
//                   <Typography variant="body2" sx={{ color: "#ccc" }}>
//                     Matched Skills: {match.score}%
//                   </Typography>
//                   <Box sx={{ mt: 1 }}>
//                     <LinearProgress
//                       variant="determinate"
//                       value={match.score}
//                       sx={{
//                         height: 10,
//                         borderRadius: 5,
//                         backgroundColor: "#444",
//                         "& .MuiLinearProgress-bar": {
//                           background: match.score >= 75
//                             ? "#00e676"
//                             : match.score >= 50
//                               ? "#ffeb3b"
//                               : "#f44336",
//                         },
//                       }}
//                     />
//                   </Box>
//                 </>
//               }
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// }




// import { useEffect, useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";

// export default function MatchedResumes({ opportunities }) {
//   const [matchedResumes, setMatchedResumes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/resumes");
//         const allResumes = await res.json();

//         // Match logic: resume.skills must include at least one opportunity skill
//         const matched = allResumes.filter((resume) => {
//           const skills = resume.skills.map((s) => s.toLowerCase());
//           return opportunities.some((op) =>
//             skills.includes(op.toLowerCase())
//           );
//         });

//         setMatchedResumes(matched);
//       } catch (error) {
//         console.error("Failed to fetch resumes", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResumes();
//   }, [opportunities]);

//   if (loading) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ mt: 4 }}>
//       ched to the opportunities.
//         </Typography>{matchedResumes.length === 0 ? (
//         <Typography color="error" variant="h6">
//           No resume mat
//       ) : (
//         matchedResumes.map((resume, index) => (
//           <Paper
//             key={index}
//             elevation={3}
//             sx={{
//               p: 3,
//               mb: 2,
//               backgroundColor: "#121212",
//               color: "#fff",
//               borderRadius: 2,
//             }}
//           >
//             <Typography variant="h6">{resume.name}</Typography>
//             <Typography variant="body2" color="gray">
//               {resume.email}
//             </Typography>
//             <Typography variant="body2">
//               Skills: {resume.skills.join(", ")}
//             </Typography>
//           </Paper>
//         ))
//       )}
//     </Box>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Box,
} from "@mui/material";

export default function MatchResult({ jobId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(`http://localhost:5000/match/${jobId}`);
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Error fetching match results:", err);
        setError("Failed to load matches.");
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [jobId]);

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Matched Resumes
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : matches.length === 0 ? (
        <Typography sx={{ color: "#ccc" }}>
          No resumes matched this opportunity.
        </Typography>
      ) : (
        <List>
          {matches.map((match, idx) => (
            <ListItem
              key={idx}
              sx={{
                mb: 2,
                border: "1px solid #333",
                borderRadius: 2,
                backgroundColor: "#2a2a3d",
                p: 2,
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ color: "#00e5ff" }}>
                    {match.name} ({match.email})
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                      Matched Skills: {match.score}%
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={match.score}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#444",
                          "& .MuiLinearProgress-bar": {
                            background:
                              match.score >= 75
                                ? "#00e676"
                                : match.score >= 50
                                ? "#ffeb3b"
                                : "#f44336",
                          },
                        }}
                      />
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
