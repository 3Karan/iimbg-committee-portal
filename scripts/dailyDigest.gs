/**
 * dailyDigest.gs
 * Google Apps Script that sends a daily summary of new feedback responses.
 * 
 * SETUP:
 * 1. Open the Google Sheet linked to your Feedback Google Form
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code (can be in the same project as onFormSubmit.gs)
 * 4. Go to Triggers (clock icon) → Add Trigger:
 *    - Function: sendDailyDigest
 *    - Event source: Time-driven
 *    - Type of time-based trigger: Day timer
 *    - Time of day: 9 AM to 10 AM (or your preference)
 * 5. Update DIGEST_RECIPIENTS with your email address(es)
 */

// ============ CONFIGURATION ============

// Email recipients for the daily digest (comma-separated for multiple)
var DIGEST_RECIPIENTS = "your-email@example.com"; // UPDATE THIS

// Name of the sheet tab containing feedback responses
var FEEDBACK_SHEET_NAME = "Form Responses 1"; // Default name when linked to a Google Form

// Slack webhook URL (optional — uncomment the Slack section in sendDailyDigest to use)
var SLACK_WEBHOOK_URL = ""; // Paste your Slack Incoming Webhook URL here

// ============ MAIN FUNCTION ============

/**
 * Sends a daily digest email summarizing today's feedback responses.
 * Designed to run on a time-driven trigger (daily).
 */
function sendDailyDigest() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(FEEDBACK_SHEET_NAME);
    
    if (!sheet) {
      Logger.log("Sheet '" + FEEDBACK_SHEET_NAME + "' not found. Check FEEDBACK_SHEET_NAME config.");
      return;
    }
    
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log("No data found in the sheet (only headers or empty).");
      return;
    }
    
    // Get today's date (midnight)
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter rows from today
    // Assumes column 0 is Timestamp, column 1 is Name, column 2 is Email,
    // column 3 is Event, column 4 is Rating, column 5 is Comments
    var todayResponses = [];
    
    for (var i = 1; i < data.length; i++) { // Skip header row
      var rowDate = new Date(data[i][0]);
      rowDate.setHours(0, 0, 0, 0);
      
      if (rowDate.getTime() === today.getTime()) {
        todayResponses.push({
          timestamp: data[i][0],
          name: data[i][1],
          email: data[i][2],
          event: data[i][3],
          rating: parseInt(data[i][4]) || 0,
          comments: data[i][5] || "—"
        });
      }
    }
    
    // Calculate statistics
    var totalResponses = todayResponses.length;
    
    if (totalResponses === 0) {
      Logger.log("No new responses today. Skipping digest.");
      // Optionally, still send a "no new responses" email:
      // sendNoResponsesEmail();
      return;
    }
    
    var totalRating = 0;
    var eventCounts = {};
    var ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    todayResponses.forEach(function(response) {
      totalRating += response.rating;
      ratingDistribution[response.rating] = (ratingDistribution[response.rating] || 0) + 1;
      eventCounts[response.event] = (eventCounts[response.event] || 0) + 1;
    });
    
    var avgRating = (totalRating / totalResponses).toFixed(1);
    
    // Find top event
    var topEvent = "";
    var topEventCount = 0;
    for (var event in eventCounts) {
      if (eventCounts[event] > topEventCount) {
        topEvent = event;
        topEventCount = eventCounts[event];
      }
    }
    
    // Build event breakdown HTML
    var eventBreakdownHtml = "";
    for (var evt in eventCounts) {
      eventBreakdownHtml += `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #1e293b; color: #e2e8f0;">${evt}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #1e293b; color: #f0c75e; text-align: center;">${eventCounts[evt]}</td>
        </tr>
      `;
    }
    
    // Build rating distribution bar
    var ratingBarHtml = "";
    for (var r = 5; r >= 1; r--) {
      var count = ratingDistribution[r] || 0;
      var percentage = totalResponses > 0 ? ((count / totalResponses) * 100).toFixed(0) : 0;
      ratingBarHtml += `
        <div style="display: flex; align-items: center; margin: 4px 0;">
          <span style="color: #f0c75e; width: 30px;">${r}★</span>
          <div style="flex: 1; background: #1e293b; border-radius: 4px; height: 16px; margin: 0 10px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #d4a853, #f0c75e); height: 100%; width: ${percentage}%; border-radius: 4px; transition: width 0.3s;"></div>
          </div>
          <span style="color: #94a3b8; width: 50px; text-align: right;">${count} (${percentage}%)</span>
        </div>
      `;
    }
    
    // Build recent comments HTML (last 5)
    var recentComments = todayResponses
      .filter(function(r) { return r.comments && r.comments !== "—"; })
      .slice(-5);
    
    var commentsHtml = "";
    recentComments.forEach(function(r) {
      var stars = "";
      for (var s = 1; s <= 5; s++) {
        stars += s <= r.rating ? "★" : "☆";
      }
      commentsHtml += `
        <div style="background: #0a1628; border-radius: 6px; padding: 12px; margin: 8px 0; border-left: 3px solid #d4a853;">
          <p style="color: #e2e8f0; margin: 0 0 4px; font-style: italic;">"${r.comments}"</p>
          <p style="color: #64748b; margin: 0; font-size: 12px;">— ${r.name} | ${r.event} | <span style="color: #f0c75e;">${stars}</span></p>
        </div>
      `;
    });
    
    if (!commentsHtml) {
      commentsHtml = '<p style="color: #64748b; font-style: italic;">No comments received today.</p>';
    }
    
    // Compose the digest email
    var subject = "📊 Daily Feedback Digest — " + formatDate(today) + " | IIM Bodh Gaya IT Committee";
    
    var htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #0a1628; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #d4a853, #f0c75e); padding: 25px; text-align: center;">
          <h1 style="color: #0a1628; margin: 0; font-size: 22px;">📊 Daily Feedback Digest</h1>
          <p style="color: #111d35; margin: 5px 0 0; font-size: 14px;">${formatDate(today)} | IIM Bodh Gaya IT Committee</p>
        </div>
        
        <!-- Key Metrics -->
        <div style="padding: 25px;">
          <div style="display: flex; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;">
            
            <!-- Total Responses -->
            <div style="flex: 1; min-width: 120px; background: #111d35; border-radius: 8px; padding: 15px; text-align: center;">
              <p style="color: #64748b; margin: 0; font-size: 12px; text-transform: uppercase;">Total Responses</p>
              <p style="color: #f0c75e; margin: 8px 0 0; font-size: 32px; font-weight: bold;">${totalResponses}</p>
            </div>
            
            <!-- Average Rating -->
            <div style="flex: 1; min-width: 120px; background: #111d35; border-radius: 8px; padding: 15px; text-align: center;">
              <p style="color: #64748b; margin: 0; font-size: 12px; text-transform: uppercase;">Avg Rating</p>
              <p style="color: #f0c75e; margin: 8px 0 0; font-size: 32px; font-weight: bold;">${avgRating}<span style="font-size: 16px;">/5</span></p>
            </div>
            
            <!-- Top Event -->
            <div style="flex: 1; min-width: 120px; background: #111d35; border-radius: 8px; padding: 15px; text-align: center;">
              <p style="color: #64748b; margin: 0; font-size: 12px; text-transform: uppercase;">Top Event</p>
              <p style="color: #f0c75e; margin: 8px 0 0; font-size: 14px; font-weight: bold;">${topEvent}</p>
              <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px;">${topEventCount} response${topEventCount > 1 ? 's' : ''}</p>
            </div>
            
          </div>
          
          <!-- Rating Distribution -->
          <div style="background: #111d35; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #d4a853; margin: 0 0 15px;">Rating Distribution</h3>
            ${ratingBarHtml}
          </div>
          
          <!-- Event Breakdown -->
          <div style="background: #111d35; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #d4a853; margin: 0 0 15px;">Responses by Event</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 8px 12px; text-align: left; color: #64748b; border-bottom: 2px solid #d4a853; font-size: 12px; text-transform: uppercase;">Event</th>
                  <th style="padding: 8px 12px; text-align: center; color: #64748b; border-bottom: 2px solid #d4a853; font-size: 12px; text-transform: uppercase;">Count</th>
                </tr>
              </thead>
              <tbody>
                ${eventBreakdownHtml}
              </tbody>
            </table>
          </div>
          
          <!-- Recent Comments -->
          <div style="background: #111d35; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #d4a853; margin: 0 0 15px;">Recent Comments</h3>
            ${commentsHtml}
          </div>
          
          <!-- Footer -->
          <p style="color: #475569; font-size: 12px; text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #1e293b;">
            This is an automated daily digest from the IIM Bodh Gaya IT Committee Feedback System.<br>
            Generated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      </div>
    `;
    
    // Send digest email
    MailApp.sendEmail({
      to: DIGEST_RECIPIENTS,
      subject: subject,
      htmlBody: htmlBody,
      name: "IIM Bodh Gaya IT Committee — Feedback System"
    });
    
    Logger.log("Daily digest sent to " + DIGEST_RECIPIENTS + ". " + totalResponses + " responses. Avg rating: " + avgRating);
    
    // Optional: Send to Slack
    if (SLACK_WEBHOOK_URL) {
      sendSlackDigest(totalResponses, avgRating, topEvent, topEventCount, todayResponses);
    }
    
  } catch (error) {
    Logger.log("Error in sendDailyDigest: " + error.toString());
  }
}

/**
 * Sends the digest summary to a Slack channel via Incoming Webhook.
 */
function sendSlackDigest(totalResponses, avgRating, topEvent, topEventCount, responses) {
  if (!SLACK_WEBHOOK_URL) return;
  
  var slackMessage = {
    text: "📊 *Daily Feedback Digest — " + formatDate(new Date()) + "*",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "📊 Daily Feedback Digest" }
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Total Responses:*\n" + totalResponses },
          { type: "mrkdwn", text: "*Avg Rating:*\n" + avgRating + "/5 ⭐" },
          { type: "mrkdwn", text: "*Top Event:*\n" + topEvent },
          { type: "mrkdwn", text: "*Top Event Responses:*\n" + topEventCount }
        ]
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: "_IIM Bodh Gaya IT Committee | " + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + " IST_" }
        ]
      }
    ]
  };
  
  try {
    UrlFetchApp.fetch(SLACK_WEBHOOK_URL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(slackMessage)
    });
    Logger.log("Slack digest sent successfully.");
  } catch (error) {
    Logger.log("Slack webhook failed: " + error.toString());
  }
}

/**
 * Formats a date as "Month Day, Year" (e.g., "August 3, 2026").
 */
function formatDate(date) {
  var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

/**
 * Test function — manually run to test the digest email.
 * This sends a digest of ALL responses (not just today's) for testing purposes.
 */
function testDailyDigest() {
  // Temporarily modify to include all responses for testing
  sendDailyDigest();
  Logger.log("Test digest completed. Check the recipient's inbox.");
}
