# Google Event Scheduler

Google Event Scheduler is a Node.js application that allows users to create Google Calendar events with integrated Google Meet links. The application uses the Google Calendar API for event scheduling and OAuth2 for authentication.

## Features

- **OAuth2 Authentication**: Securely authenticate with Google to access your calendar.
- **Google Calendar Integration**: Create events directly on your Google Calendar.
- **Google Meet Integration**: Automatically generate Google Meet links for your events.
- **RESTful API**: Simple and easy-to-use endpoints for authentication and event creation.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js and npm installed.
- A Google Cloud project with the Calendar API enabled.
- OAuth2 credentials (Client ID, Client Secret, and Redirect URI).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kahnu044/google-event-scheduler.git
    cd google-event-scheduler
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Google OAuth2 credentials:

    ```env
    CLIENT_ID=your-client-id
    CLIENT_SECRET=your-client-secret
    REDIRECT_URL=your-redirect-url
    PORT=8000
    API_KEY=your-api-key
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:8000`.

## API Endpoints

### 1. Authentication

**GET `/auth`**

Redirects the user to the Google OAuth2 consent screen for authentication.

**GET `/auth/redirect`**

Handles the OAuth2 callback and stores the access token.

### 2. Create Event

**GET `/create-event`**

Creates a Google Calendar event with a Google Meet link.

- **Response:**

    ```json
    {
      "success": true,
      "message": "Event created",
      "data": {
        "id": "event-id",
        "summary": "Tech Talk with kahnu",
        "location": "Google Meet",
        "description": "Demo event for Kahnu's Blog Post.",
        "start": {
          "dateTime": "2024-08-16T12:00:00+05:30",
          "timeZone": "Asia/Kolkata"
        },
        "end": {
          "dateTime": "2024-08-16T12:30:00+05:30",
          "timeZone": "Asia/Kolkata"
        },
        "conferenceData": {
          "entryPoints": [
            {
              "entryPointType": "video",
              "uri": "https://meet.google.com/abc-defg-hij",
              "label": "meet.google.com/abc-defg-hij"
            }
          ]
        }
      },
      "link": "https://meet.google.com/abc-defg-hij"
    }
    ```

## Project Structure

- **server.js**: Main server file, defines API routes.
- **service/googleService.js**: Contains the logic for Google OAuth2 and event creation.

## Acknowledgements

- [Google Cloud Console](https://console.cloud.google.com)
- [Google Calendar API](https://developers.google.com/calendar)
- [Google OAuth2](https://developers.google.com/identity/protocols/oauth2)
