# Google Services Setup Guide — IIM Bodh Gaya IT Committee Portal

This guide walks you through setting up the Google services required for the portal's backend (registration storage, feedback pipeline, and dashboard).

---

## Table of Contents

1. [Google Sheet Setup](#1-google-sheet-setup)
2. [Registration Form Backend (Apps Script Web App)](#2-registration-form-backend)
3. [Feedback Google Form](#3-feedback-google-form)
4. [Thank-You Email Automation](#4-thank-you-email-automation)
5. [Daily Digest Automation](#5-daily-digest-automation)
6. [Looker Studio Dashboard](#6-looker-studio-dashboard)
7. [Connecting Everything](#7-connecting-everything)

---

## 1. Google Sheet Setup

### Create the Sheet

1. Go to [Google Sheets](https://sheets.google.com) → Click **Blank spreadsheet**
2. Name it: **"IIM Bodh Gaya IT Committee Portal — Data"**

### Create the Registrations Tab

1. Rename the default sheet tab to **"Registrations"**
2. Add these headers in Row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Event | Comments |

3. Format Row 1 as **bold** with a colored background.

### The Feedback Tab

The Feedback tab will be auto-created when you link a Google Form (Step 3).

---

## 2. Registration Form Backend

### Deploy the Apps Script Web App

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any default code in `Code.gs`
3. Copy the entire contents of [`registrationHandler.gs`](./registrationHandler.gs) and paste it
4. Click **Deploy → New Deployment**
5. Click the gear icon → Select **Web app**
6. Configure:
   - **Description**: "Registration Handler v1"
   - **Execute as**: Me (your account)
   - **Who has access**: Anyone
7. Click **Deploy**
8. **Authorize** the script when prompted (review permissions, click Allow)
9. **Copy the Web App URL** — you'll need this for the frontend

### Connect to the Frontend

1. In your project directory, create/edit `.env.local`:
   ```
   NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. Restart the dev server (`npm run dev`)

### Test

1. Open the portal → Navigate to the Register page
2. Fill in the form and submit
3. Check your Google Sheet — a new row should appear in the Registrations tab

---

## 3. Feedback Google Form

### Create the Form

1. Go to [Google Forms](https://forms.google.com) → Click **Blank**
2. Title: **"Event Feedback — IIM Bodh Gaya IT Committee"**
3. Add these fields **in this exact order**:

| # | Field | Type | Settings |
|---|---|---|---|
| 1 | **Name** | Short answer | Required |
| 2 | **Email** | Short answer | Required, Response validation: Email |
| 3 | **Event Attended** | Dropdown | Required. Options: CodeStorm Hackathon, Bodh Utsav Cultural Night, AI & ML Workshop, Leadership in the Digital Age, TechExpo 2026, Startup Bootcamp, Alumni Meet & Networking Gala, Future of Finance Panel |
| 4 | **Rating** | Linear scale | Required, 1 (Poor) to 5 (Excellent) |
| 5 | **Comments** | Paragraph | Optional |

### Link to Google Sheet

1. In the Form, click the **Responses** tab
2. Click the Google Sheets icon (📊) → **Create a new spreadsheet** or **Select existing spreadsheet**
3. If selecting existing, choose your "IIM Bodh Gaya IT Committee Portal — Data" sheet
4. This creates a "Form Responses 1" tab automatically

---

## 4. Thank-You Email Automation

### Add the Script

1. Open the Google Sheet (the one linked to the Feedback Form)
2. Go to **Extensions → Apps Script**
3. If you already have `registrationHandler.gs` code, create a new file:
   - Click **+** → **Script** → Name it `onFormSubmit`
4. Copy the contents of [`onFormSubmit.gs`](./onFormSubmit.gs) and paste it

### Set Up the Trigger

1. In Apps Script, click the **clock icon** (Triggers) in the left sidebar
2. Click **+ Add Trigger**
3. Configure:
   - **Function**: `onFormSubmit`
   - **Deployment**: Head
   - **Event source**: From spreadsheet
   - **Event type**: On form submit
4. Click **Save** → Authorize if prompted

### Test

1. Submit a response to your Google Form
2. Check the respondent's email — a branded thank-you email should arrive within 1-2 minutes

---

## 5. Daily Digest Automation

### Add the Script

1. In the same Apps Script project, create a new file:
   - Click **+** → **Script** → Name it `dailyDigest`
2. Copy the contents of [`dailyDigest.gs`](./dailyDigest.gs) and paste it
3. **Update the configuration** at the top of the file:
   - `DIGEST_RECIPIENTS`: Your email address (or comma-separated list)
   - `FEEDBACK_SHEET_NAME`: The name of your feedback responses tab (usually "Form Responses 1")
   - `SLACK_WEBHOOK_URL`: (Optional) Your Slack Incoming Webhook URL

### Set Up the Trigger

1. Click the **clock icon** (Triggers)
2. Click **+ Add Trigger**
3. Configure:
   - **Function**: `sendDailyDigest`
   - **Deployment**: Head
   - **Event source**: Time-driven
   - **Type of time-based trigger**: Day timer
   - **Time of day**: 9 AM to 10 AM
4. Click **Save**

### Test

1. Run the `testDailyDigest` function manually from the Apps Script editor
2. Check your email for the digest

---

## 6. Looker Studio Dashboard

### Create the Dashboard

1. Go to [Looker Studio](https://lookerstudio.google.com)
2. Click **Create → Report**
3. Add a data source: **Google Sheets**
4. Select your "IIM Bodh Gaya IT Committee Portal — Data" spreadsheet
5. Select the **"Form Responses 1"** (Feedback) tab
6. Click **Add** → **Add to Report**

### Add Visualizations

#### Scorecard: Average Rating
1. Insert → **Scorecard**
2. Metric: Rating → Aggregation: **Average**
3. Style: Large number, gold color

#### Time Series: Response Volume Over Time
1. Insert → **Time Series Chart**
2. Date dimension: Timestamp
3. Metric: Record Count
4. Style: Area chart, navy/gold colors

#### Bar/Pie Chart: Breakdown by Event
1. Insert → **Bar Chart** or **Pie Chart**
2. Dimension: Event Attended
3. Metric: Record Count
4. Style: Colorful, matching the portal's design

#### (Optional) Rating Distribution
1. Insert → **Bar Chart**
2. Dimension: Rating
3. Metric: Record Count
4. Sort by Rating ascending

### Share the Dashboard

1. Click **Share** (top right)
2. Set to **"Anyone with the link can view"**
3. Copy the link for your submission

---

## 7. Connecting Everything

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Verification Checklist

- [ ] Registration form submits → data appears in Google Sheet
- [ ] Feedback form submits → thank-you email arrives
- [ ] Daily digest function runs → digest email arrives
- [ ] Looker Studio dashboard shows data from the feedback sheet
- [ ] All links are set to "Anyone with the link can view"

### Links to Collect for Submission

1. **Google Sheet URL** (viewer access)
2. **Google Form URL** (responder access)
3. **Looker Studio Dashboard URL** (viewer access)
4. **Apps Script Web App URL** (for the registration handler)

---

## Troubleshooting

### "Authorization required" error
- Re-deploy the Web App and re-authorize with your Google account

### Form submissions not appearing in Sheet
- Verify the Form is linked to the correct Sheet
- Check Apps Script execution logs: View → Execution log

### Thank-you email not sending
- Check MailApp quota (100 emails/day for free accounts)
- Verify the trigger is set as "installable" (not simple)
- Check the Apps Script trigger's error log

### CORS errors from the registration form
- Apps Script Web Apps don't have CORS issues when using `mode: 'no-cors'` or redirecting POST
- Make sure the Web App is deployed with "Anyone" access
