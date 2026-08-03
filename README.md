# IIM Bodh Gaya — IT Committee Portal

A responsive, premium web portal for the IT Committee at IIM Bodh Gaya, built with Next.js and Tailwind CSS. This project fulfills the requirements for Task A (Core Build) and Track 2 (Automation & Data).

---

## 🔗 Submission Links

| Deliverable | Link |
|---|---|
| **Live Portal (Vercel)** | https://iimbg-committee-portal-one.vercel.app/ |
| **GitHub Repository** | https://github.com/3Karan/iimbg-committee-portal |
| **Dashboard (Looker Studio)**| https://datastudio.google.com/reporting/9345ea08-3224-4769-aa19-c492754fba52/page/JgU5F |
| **Feedback Google Form** | https://docs.google.com/forms/d/e/1FAIpQLScBxf-aR0r4Cynx1zdwoBWe0r5nNNNwmCQOl_zgaCi117kk9Q/viewform |
| **End-to-End Run (Video)** | _[Paste your 2-minute video link here]_ |

---

## 📸 Screenshots

<img width="1917" height="903" alt="image" src="https://github.com/user-attachments/assets/26c76404-9027-41b6-8b1a-6bcc47918540" />

---

## ✨ Completed Features

### Task A — Core Build
- [x] **Events Section** — 8 events rendered dynamically from a JSON data file (`data/events.json`).
- [x] **Search & Filter** — Real-time search by event name + category filtering.
- [x] **Team Page** — Committee members presented in a responsive card layout with roles and bios.
- [x] **Registration Form** — Client-side validated form that genuinely stores submissions using a Google Apps Script Web App (saves directly to Google Sheets).
- [x] **Responsive Design** — Fully mobile-responsive layout including a hamburger navigation menu.

### Track 2 — Automation & Data
- [x] **Collection** — Google Form capturing event feedback (rating, comments).
- [x] **Automation** — Google Apps Script (`onFormSubmit.gs`) that automatically sends a branded HTML thank-you email upon submission.
- [x] **Digest** — Scheduled Apps Script (`dailyDigest.gs`) that emails a daily summary of responses (metrics, top event, rating distribution).
- [x] **Dashboard** — Looker Studio dashboard visualizing average rating, response volume over time, and a breakdown by event.

---

## 🛠️ Setup and Run Instructions

### Prerequisites
- Node.js 18+ and npm


## 🤖 AI Usage

This project used AI tools strictly within the permitted assignment guidelines:

- **Google Gemini**: Assisted with scaffolding the Next.js component structure, generating the CSS design system (Tailwind), and writing the Google Apps Script code for the registration handler and email automations.
- **AI Image Generation**: Generated placeholder team avatar photos and event images for prototyping purposes.

All AI-generated code was thoroughly reviewed, tested, and integrated manually to ensure it meets the specific architectural requirements of the assignment.

---
_Built for the IIM Bodh Gaya Committee Assignment_
