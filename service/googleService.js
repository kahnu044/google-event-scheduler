// googleService.js
const { google } = require('googleapis');

// Define the scope of access for the Google Calendar API.
const scopes = ['https://www.googleapis.com/auth/calendar'];

// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const createEvent = async () => {
    const calendar = google.calendar({
        version: 'v3',
        auth: oauth2Client
    });

    const event = {
        summary: 'Tech Talk with kahnu',
        location: 'Google Meet',

        description: "Demo event for Kahnu's Blog Post.",
        start: {
            dateTime: "2024-08-16T12:00:00+05:30",
            timeZone: 'Asia/Kolkata'
        },
        end: {
            dateTime: "2024-08-16T12:30:00+05:30",
            timeZone: 'Asia/Kolkata'
        },
    };

    try {
        const result = await calendar.events.insert({
            calendarId: 'primary',
            auth: oauth2Client,
            resource: event
        });

        return {
            success: true,
            result: result
        }

    } catch (err) {
        console.log("Event Creation Error", err);
        return {
            success: false,
            result: "",
            error: err
        }
    }


}

module.exports = { oauth2Client, scopes, createEvent };