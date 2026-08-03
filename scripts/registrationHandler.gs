/**
 * registrationHandler.gs
 * Google Apps Script Web App to handle event registration form submissions.
 * 
 * HOW IT WORKS:
 * The Next.js registration form sends a POST request with URL-encoded form data.
 * This script parses the data and appends it as a new row in the "Registrations" 
 * tab of the connected Google Sheet.
 * 
 * DATA FLOW:
 * Browser → fetch POST (no-cors, form-urlencoded) → Apps Script doPost() → Google Sheet
 * 
 * SETUP:
 * 1. Create a Google Sheet with a tab named "Registrations"
 * 2. Add headers in Row 1: Timestamp | Name | Email | Phone | Event | Comments
 * 3. Open Extensions → Apps Script
 * 4. Paste this entire code into Code.gs (replace any default code)
 * 5. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → Authorize when prompted → Allow
 * 7. Copy the Web App URL
 * 8. Paste the URL into your .env.local file:
 *    NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
 * 9. Restart your Next.js dev server
 */

/**
 * Handles POST requests from the registration form.
 * Accepts both URL-encoded form data and JSON body.
 */
function doPost(e) {
  try {
    var data;
    
    // Parse data based on content type
    if (e.postData && e.postData.type === 'application/json') {
      // JSON body
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // URL-encoded form data (from fetch with 'application/x-www-form-urlencoded')
      data = {
        name: e.parameter.name || '',
        email: e.parameter.email || '',
        phone: e.parameter.phone || '',
        event: e.parameter.event || '',
        comments: e.parameter.comments || ''
      };
    } else {
      throw new Error('No data received');
    }
    
    // Validate that we have at least name and email
    if (!data.name || !data.email) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: 'error', 
          message: 'Name and email are required' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open the active spreadsheet and get the Registrations tab
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
    
    if (!sheet) {
      // If Registrations tab doesn't exist, create it
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Registrations');
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Event', 'Comments']);
      // Bold the header row
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }
    
    // Append the registration data as a new row
    sheet.appendRow([
      new Date().toISOString(),   // Timestamp
      data.name,                   // Name
      data.email,                  // Email
      data.phone || '',            // Phone
      data.event || '',            // Event
      data.comments || ''          // Comments
    ]);
    
    // Log success
    Logger.log('Registration saved: ' + data.name + ' (' + data.email + ') for ' + data.event);
    
    // Send confirmation email to the registrant
    try {
      sendConfirmationEmail(data);
      Logger.log('Confirmation email sent to: ' + data.email);
    } catch (emailError) {
      Logger.log('Email send failed (non-critical): ' + emailError.toString());
      // Don't fail the registration if email fails
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Registration saved successfully!' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Failed to process registration: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests — used for health checks and testing.
 * Visit the Web App URL in a browser to verify it's working.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'IIM Bodh Gaya IT Committee Registration API is running.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sends a confirmation email to the registrant.
 * Uses Gmail via MailApp (100 emails/day on free tier).
 */
function sendConfirmationEmail(data) {
  var subject = 'Registration Confirmed — ' + data.event + ' | IIM Bodh Gaya IT Committee';
  
  var htmlBody = '<!DOCTYPE html>' +
    '<div style="font-family: Segoe UI, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1628; color: #e2e8f0; border-radius: 12px; overflow: hidden;">' +
      '<div style="background: linear-gradient(135deg, #d4a853, #f0c75e); padding: 30px; text-align: center;">' +
        '<h1 style="color: #0a1628; margin: 0; font-size: 24px;">IIM Bodh Gaya</h1>' +
        '<p style="color: #111d35; margin: 5px 0 0; font-size: 16px; font-weight: 600;">IT Committee</p>' +
      '</div>' +
      '<div style="padding: 30px;">' +
        '<h2 style="color: #f0c75e; margin-top: 0;">Registration Confirmed! ✓</h2>' +
        '<p style="color: #cbd5e1; line-height: 1.6;">Dear <strong style="color: #ffffff;">' + data.name + '</strong>,</p>' +
        '<p style="color: #cbd5e1; line-height: 1.6;">Thank you for registering for <strong style="color: #f0c75e;">' + data.event + '</strong>. We are excited to have you join us!</p>' +
        '<div style="background: #111d35; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #d4a853;">' +
          '<h3 style="color: #d4a853; margin-top: 0;">Registration Details</h3>' +
          '<p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Name:</strong> ' + data.name + '</p>' +
          '<p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Email:</strong> ' + data.email + '</p>' +
          '<p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Phone:</strong> ' + (data.phone || 'N/A') + '</p>' +
          '<p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Event:</strong> ' + data.event + '</p>' +
          (data.comments ? '<p style="color: #94a3b8; margin: 8px 0;"><strong style="color: #e2e8f0;">Comments:</strong> ' + data.comments + '</p>' : '') +
        '</div>' +
        '<p style="color: #cbd5e1; line-height: 1.6;">We will send you further details about the event closer to the date. If you have any questions, feel free to reach out.</p>' +
        '<p style="color: #64748b; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b;">' +
          'Best regards,<br><strong style="color: #d4a853;">IT Committee, IIM Bodh Gaya</strong>' +
        '</p>' +
      '</div>' +
    '</div>';
  
  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody,
    name: 'IIM Bodh Gaya IT Committee'
  });
}

/**
 * TEST FUNCTION — Run this from the Apps Script editor to verify everything works.
 * It creates a test registration and sends a test email.
 * 
 * Steps:
 * 1. Replace 'your-email@example.com' with your actual email
 * 2. Click the Run button (▶) in the Apps Script editor
 * 3. Check the Sheet for a new row + your email for the confirmation
 */
function testRegistration() {
  var testEvent = {
    parameter: {
      name: 'Test User',
      email: 'your-email@example.com',  // ← CHANGE THIS to your email
      phone: '9876543210',
      event: 'CodeStorm Hackathon',
      comments: 'This is a test registration'
    },
    postData: null
  };
  
  var result = doPost(testEvent);
  Logger.log('Test result: ' + result.getContent());
}
