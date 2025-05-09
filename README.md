# 💼 SkillBridge - A Smart Job Manager

SkillBridge is a modern, responsive web application designed to streamline the job matching process. It allows companies to post jobs, candidates to submit resumes, and then intelligently matches resumes to job postings based on skill relevance.

## 🔥 Features

- ✅ Post jobs with titles, descriptions, and required skills
- ✅ Upload resumes in PDF/DOC/DOCX formats
- ✅ Smart skill-based resume matching
- ✅ Aesthetic and responsive **Dark Theme UI** using **Material-UI (MUI)**
- ✅ Built with **React** for the frontend and a **Node.js/Express** backend (API)

---

## 🖥️ Demo
 Coming Soon (Add Netlify/Vercel/Render link here if hosted)
---



## 📁 Project Structure

skillbridge/
├── client/ # React frontend
│ ├── components/
│ │ ├── JobForm.jsx
│ │ ├── ResumeForm.jsx
│ │ └── MatchResult.jsx
│ ├── App.jsx
│ └── index.css
├── server/ # Express backend
│ ├── routes/
│ ├── controllers/
│ └── models/
└── README.md

yaml
Copy
Edit

---

## 🛠️ Tech Stack

### Frontend:
- React
- Material-UI (MUI)
- CSS (Dark Theme, Responsive)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Divya-Verma22/skillbridge.git
cd skillbridge
2. Run Backend (Express API)
bash
Copy
Edit
cd server
npm install
npm run dev
Runs on http://localhost:5000

3. Run Frontend (React)
bash
Copy
Edit
cd client
npm install
npm start
Runs on http://localhost:5000

📦 API Endpoints
Method	Endpoint	Description
POST	/jobs	Create a new job
POST	/resumes	Upload a resume
GET	/match/:jobId	Get matching resumes by job

⚠️ Notes
Resume file type must be PDF, DOC, or DOCX.

Skills must be comma-separated in both job form and resume form.
Ensure MongoDB is running locally or provide a connection string.
🙌 Contributing
Contributions are welcome! Open an issue or submit a pull request.



📫 Contact
Have feedback or questions? Reach out:

📧 dv7991393l@gmail.com











