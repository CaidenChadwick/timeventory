'use server'

export const JoinEmail = async (user: string) => {
    return (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add CSS */
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>Welcome!</h1>
                <p>Hello ${user},</p>
                <p>Welcome to Timeventory.</p>
            </div>
        </body>
        </html>
        `
    );
};