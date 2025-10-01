# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form functionality in your portfolio.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Create Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key

1. Go to "Account" > "General"
2. Find your **Public Key** in the API Keys section

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Not receiving emails**: Verify your email service configuration
- **Template variables not working**: Ensure template variable names match exactly

## Security Notes

- The public key is safe to expose in client-side code
- EmailJS handles rate limiting automatically
- Consider adding reCAPTCHA for production use

For more details, visit the [EmailJS Documentation](https://www.emailjs.com/docs/).
