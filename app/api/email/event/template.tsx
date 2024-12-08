'use server'

export const EventEmail = async (orgName: string, eventName: string, timeOfEvent: string, placeOfEvent: string) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .event-container {
                    border: 1px solid #ccc;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>${orgName} Created an Event.</h1>
                <h2>Event Details</h2>
                <div classname = event-container>
                <h3>Event Name</h3>
                <p>${eventName}</p>
                <h3>Date and Time</h3>
                <p>${timeOfEvent}</p>
                <h3>Location</h3>
                <p>${placeOfEvent}</p>
                </div>
            </div>
        </body>
        </html>`
    )
}