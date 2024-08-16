const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { oauth2Client, scopes, createEvent } = require('./service/googleService');

const PORT = process.env.PORT || 8000;
const app = express();

// Routes
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Welcome to our backend Server"
    });
});

app.get('/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl
        ({
            access_type: 'offline',
            scope: scopes
        });
    res.redirect(url);
});

app.get("/auth/redirect", async (req, res) => {

    const { tokens } = await oauth2Client.getToken(req.query.code);
    // {
    //     access_token: 'ya29.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_8rMsiYDSYpbY-cQPL_bj1o1SSjeLSYiVjCQr86BqHpMXXXXXXXXXcHVreGSkL1RQIEq3TA6bMswjhQuaiRDuqUeOJoh5DsGnSgkIks15jYEGh5rSNRhKdfuS0oj_tVrhgvJx9obu8oZaCgYKAa4SARESFQHGX2MicrNJHscz9fs0oZyPrkj6qQ0171',
    //     refresh_token: '1//0g8PJ36zZ-NxMXXXXXXXXXXXXAAGBASNwF-L9IrlCzT_rlZ9SXXXXXXXXXXXXXXXR_LeNFntd4PKsiFnEE3DqYkXXXXXXXXXXLjG9vU',
    //     scope: 'https://www.googleapis.com/auth/calendar',
    //     token_type: 'Bearer',
    //     expiry_date: 1723636310687
    // }
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! Please return to the console.');
});

app.get('/create-event', async (req, res) => {

    try {
        const eventResponse = await createEvent();
        if (!eventResponse.success) {
            return res.status(400).json({
                success: eventResponse.success,
                message: 'Event creation failed',
                data: ''
            })
        }

        return res.status(200).json({
            success: eventResponse.success,
            message: 'Event created',
            data: eventResponse.result
        });
    } catch (error) {

        console.log(err);
        return res.status(500).json({
            success: result.success,
            message: 'Event creation failed',
            error: error?.message || "Internal Server Error",
            data: ''
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});