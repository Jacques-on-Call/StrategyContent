# Backend Integration Guide: Emailing the Digital Impact Blueprint

This document outlines the requirements for a backend service to handle sending the personalized Digital Impact Blueprint via email.

## API Endpoint

*   **URL:** `/api/send-blueprint-email`
*   **Method:** `POST`
*   **Content-Type:** `application/json`

## Request Payload

The frontend will send a JSON object with the following properties:

```json
{
  "email_address": "user@example.com",
  "newsletter_optin": true,
  "blueprint_html": "<html>...</html>",
  "user_selections": {
    "industry": "healthcare",
    "journey": "growth",
    "goals": ["Trust & Authority", "Attract New Clients/Leads"],
    "time": "medium",
    "budget": "low",
    "format": "blog_posts"
  },
  "brand_details": {
    "brandName": "Strategy Content Agency",
    "website": "https://yourwebsite.com",
    "contactEmail": "contact@yourwebsite.com",
    "cta": "Ready to turn this blueprint into action? Let's connect for a personalized strategy session!",
    "linkedIn": "https://linkedin.com/in/yourprofile"
  }
}
```

### Payload Property Descriptions:

*   `email_address` (String, required): The email address of the recipient.
*   `newsletter_optin` (Boolean, required): `true` if the user opted into the newsletter, `false` otherwise.
*   `blueprint_html` (String, required): The full HTML content of the personalized blueprint. This HTML is pre-formatted for presentation and includes branding elements.
*   `user_selections` (Object, required): An object containing the raw selections made by the user during the quiz. This can be used for analytics or server-side email template customization if desired.
*   `brand_details` (Object, required): An object containing branding information. This can be used by the backend to customize email templates or footers if the `blueprint_html` is not used directly as the entire email body.

## Expected Backend Behavior (Conceptual)

1.  **Receive Request**: The backend service should listen for POST requests on the `/api/send-blueprint-email` endpoint.
2.  **Parse JSON Payload**: Extract and validate the data from the request body.
3.  **Email Construction**:
    *   The primary content of the email should be the `blueprint_html`.
    *   The email subject could be something like: "Your Personalized Digital Impact Blueprint from [brandName]".
4.  **Email Sending**:
    *   Use a reliable email service provider (e.g., SendGrid, Mailgun, AWS SES, Resend) via their SDK or API.
    *   **API keys for the email service must be stored securely on the backend and NEVER exposed to the frontend.**
    *   Send the HTML email to the `email_address`.
5.  **Newsletter Subscription (Optional)**:
    *   If `newsletter_optin` is `true`, the backend should interact with the newsletter service's API (e.g., Mailchimp, Klaviyo) to add/update the subscriber. This also requires secure API key management.
6.  **Response**:
    *   On success: Return a JSON response with a success status. Example:
        ```json
        { "success": true, "message": "Blueprint email sent successfully." }
        ```
    *   On failure: Return a JSON response with an error status and a message. Example:
        ```json
        { "success": false, "message": "Failed to send blueprint email. Please try again later." }
        ```

## Security Considerations

*   **API Key Management**: All API keys (for email services, newsletter platforms, etc.) must be stored and used securely on the backend. They should not be accessible from or embedded in the frontend JavaScript.
*   **Input Validation**: Validate all incoming data, especially the `email_address`, to prevent errors and potential abuse.
*   **Rate Limiting**: Consider implementing rate limiting on the API endpoint to prevent abuse.

## Example Backend Snippet (Conceptual - Node.js with SendGrid)

This is a highly simplified conceptual example and requires proper error handling, setup, and security measures.

```javascript
// conceptual_backend_sendgrid_example.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const sgMail = require('@sendgrid/mail');
// require('dotenv').config(); // For environment variables

// const app = express();
// app.use(bodyParser.json());

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
// const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
// const mailchimp = require('@mailchimp/mailchimp_marketing');
// if (MAILCHIMP_API_KEY) {
//   mailchimp.setConfig({
//     apiKey: MAILCHIMP_API_KEY,
//     server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'usX'
//   });
// }


// app.post('/api/send-blueprint-email', async (req, res) => {
//   const { email_address, newsletter_optin, blueprint_html, user_selections, brand_details } = req.body;

//   if (!email_address || !blueprint_html || !user_selections || !brand_details) {
//     return res.status(400).json({ success: false, message: 'Missing required fields.' });
//   }

//   const emailSubject = \`Your Personalized Digital Impact Blueprint from \${brand_details.brandName}\`;
//   const msg = {
//     to: email_address,
//     from: brand_details.contactEmail, // Must be a verified sender with your email provider
//     subject: emailSubject,
//     html: blueprint_html,
//   };

//   try {
//     await sgMail.send(msg);

//     if (newsletter_optin && MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID) {
//       try {
//         await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
//           email_address: email_address,
//           status: 'subscribed',
//           // merge_fields: { FNAME: "User", LNAME: "" } // Optional
//         });
//         console.log(\`\${email_address} subscribed to newsletter.\`);
//       } catch (mcError) {
//         console.error('Mailchimp subscription error:', mcError.response ? mcError.response.body : mcError);
//         // Do not fail the whole request if newsletter subscription fails, but log it.
//       }
//     }

//     res.json({ success: true, message: 'Blueprint email sent successfully.' });
//   } catch (error) {
//     console.error('SendGrid error:', error.response ? error.response.body : error);
//     res.status(500).json({ success: false, message: 'Failed to send blueprint email.' });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
```

This guide should provide a clear starting point for backend development.
