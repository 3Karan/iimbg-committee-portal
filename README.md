# IIM Bodh Gaya — IT Committee Portal

A responsive, premium web portal for the IT Committee at IIM Bodh Gaya, built with Next.js and Tailwind CSS. This project fulfills the requirements for Task A (Core Build) and Track 2 (Automation & Data).

---

## 🔗 Submission Links

| Deliverable | Link |
|---|---|
| **Live Portal (Vercel)** | _[Paste your Vercel URL here]_ |
| **GitHub Repository** | _[Paste your GitHub repo URL here]_ |
| **Dashboard (Looker Studio)**| _[Paste your Dashboard viewer link here]_ |
| **Feedback Google Form** | _[Paste your Form link here]_ |
| **End-to-End Run (Video)** | _[Paste your 2-minute video link here]_ |

---

## 📸 Screenshots

_[Insert a screenshot of your website here. You can just drag and drop an image file into GitHub when editing this README]_

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

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone [Your-GitHub-Repo-URL]
   cd committee-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.local.example` to `.env.local` (or create it) and add your Apps Script URL:
   ```env
   NEXT_PUBLIC_APPS_SCRIPT_URL=your_google_apps_script_url_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Usage

This project used AI tools strictly within the permitted assignment guidelines:

- **Google Gemini**: Assisted with scaffolding the Next.js component structure, generating the CSS design system (Tailwind), and writing the Google Apps Script code for the registration handler and email automations.
- **AI Image Generation**: Generated placeholder team avatar photos and event images for prototyping purposes.

All AI-generated code was thoroughly reviewed, tested, and integrated manually to ensure it meets the specific architectural requirements of the assignment.

---
_Built for the IIM Bodh Gaya Committee Assignment_
