/**
 * onFormSubmit.gs
 * Google Apps Script trigger for sending thank-you emails on feedback form submission.
 * 
 * SETUP:
 * 1. Open the Google Sheet linked to your Feedback Google Form
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Go to Triggers (clock icon) → Add Trigger:
 *    - Function: onFormSubmit
 *    - Event source: From spreadsheet
 *    - Event type: On form submit
 * 5. Authorize the script when prompted
 * 
 * GOOGLE FORM FIELDS (in order):
 * 1. Name (Short answer)
 * 2. Email (Short answer)
 * 3. Event Attended (Dropdown)
 * 4. Rating (Linear scale 1-5)
 * 5. Comments (Paragraph)
 */

/**
 * Triggered automatically when a Google Form response is submitted.
 * Sends a well-formatted thank-you email to the respondent.
 * 
 * @param {Object} e - The event object from the form submission trigger
 */
function onFormSubmit(e) {
  try {
    // e.values is an array: [Timestamp, Name, Email, Event, Rating, Comments]
    var timestamp = e.values[0];
    var name = e.values[1];
    var email = e.values[2];
    var eventAttended = e.values[3];
    var rating = e.values[4];
    var comments = e.values[5] || "No additional comments";
    
    // Validate email before sending
    if (!email || !email.includes("@")) {
      Logger.log("Invalid email address: " + email);
      return;
    }
    
    // Determine rating feedback message
    var ratingMessage = getRatingMessage(parseInt(rating));
    
    // Generate star display
    var stars = getStarDisplay(parseInt(rating));
    
    // Compose the subject line
    var subject = "Thank You for Your Feedback! — " + eventAttended + " | IIM Bodh Gaya IT Committee";
    
    // Compose the HTML email body
    var htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1628; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #d4a853, #f0c75e); padding: 30px; text-align: center;">
          <h1 style="color: #0a1628; margin: 0; font-size: 24px;">IIM Bodh Gaya</h1>
          <p style="color: #111d35; margin: 5px 0 0; font-size: 16px; font-weight: 600;">IT Committee</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 30px;">
          <h2 style="color: #f0c75e; margin-top: 0;">Thank You for Your Feedback! 🙏</h2>
          
          <p style="color: #cbd5e1; line-height: 1.6;">
            Dear <strong style="color: #ffffff;">${name}</strong>,
          </p>
          
          <p style="color: #cbd5e1; line-height: 1.6;">
            Thank you for taking the time to share your feedback about 
            <strong style="color: #f0c75e;">${eventAttended}</strong>. 
            Your input is invaluable and helps us improve our future events.
          </p>
          
          <!-- Feedback Summary Card -->
          <div style="background: #111d35; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #d4a853;">
            <h3 style="color: #d4a853; margin-top: 0;">Your Feedback Summary</h3>
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #e2e8f0;">Event:</strong> ${eventAttended}
            </p>
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #e2e8f0;">Rating:</strong> 
              <span style="color: #f0c75e; font-size: 18px;">${stars}</span> (${rating}/5)
            </p>
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #e2e8f0;">Comments:</strong> ${comments}
            </p>
          </div>
          
          <!-- Rating-specific message -->
          <div style="background: rgba(212, 168, 83, 0.1); border-radius: 8px; padding: 15px; margin: 15px 0;">
            <p style="color: #e0b964; margin: 0; font-style: italic;">
              ${ratingMessage}
            </p>
          </div>
          
          <p style="color: #cbd5e1; line-height: 1.6;">
            We're constantly working to bring you more exciting events and experiences. 
            Stay tuned for upcoming events from the IT Committee!
          </p>
          
          <!-- Footer -->
          <p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b;">
            Warm regards,<br>
            <strong style="color: #d4a853;">IT Committee, IIM Bodh Gaya</strong><br>
            <span style="font-size: 12px;">This is an automated email. Please do not reply directly.</span>
          </p>
        </div>
      </div>
    `;
    
    // Send the email
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
      name: "IIM Bodh Gaya IT Committee"
    });
    
    Logger.log("Thank-you email sent to: " + email + " for event: " + eventAttended);
    
  } catch (error) {
    Logger.log("Error in onFormSubmit: " + error.toString());
    Logger.log("Event values: " + JSON.stringify(e.values));
  }
}

/**
 * Returns a personalized message based on the rating.
 */
function getRatingMessage(rating) {
  switch (rating) {
    case 5:
      return "🌟 We're thrilled you had an outstanding experience! Your enthusiasm motivates us to keep raising the bar.";
    case 4:
      return "😊 Great to know you enjoyed the event! We'll work on making it even better next time.";
    case 3:
      return "🤝 Thank you for your honest feedback. We appreciate your suggestions and will use them to improve.";
    case 2:
      return "📝 We're sorry the event didn't fully meet your expectations. Your feedback helps us identify areas for improvement.";
    case 1:
      return "🙏 We apologize for the experience. We take your feedback seriously and will work hard to address the issues you've raised.";
    default:
      return "Thank you for your valuable feedback!";
  }
}

/**
 * Returns a star emoji display for the given rating.
 */
function getStarDisplay(rating) {
  var filled = "★";
  var empty = "☆";
  var stars = "";
  for (var i = 1; i <= 5; i++) {
    stars += (i <= rating) ? filled : empty;
  }
  return stars;
}

/**
 * Test function — manually run this to test email sending.
 * Update the test email address before running.
 */
function testOnFormSubmit() {
  var testEvent = {
    values: [
      new Date().toISOString(),       // Timestamp
      "Test User",                     // Name
      "your-email@example.com",        // Email — CHANGE THIS
      "CodeStorm Hackathon",           // Event
      "5",                             // Rating
      "This was an amazing event!"     // Comments
    ]
  };
  
  onFormSubmit(testEvent);
  Logger.log("Test email sent. Check your inbox.");
}
