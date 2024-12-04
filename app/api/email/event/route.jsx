'use server'
import { NextResponse, NextRequest } from 'next/server'
import { EventEmail } from './template'
import nodemailer from 'nodemailer';

// Handles POST requests to /api

export async function POST(request) {
    const username = process.env.PUBLIC_EMAIL_USERNAME;
    const password = process.env.PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.PUBLIC_PERSONAL_EMAIL;


    const formData = await request.formData();
    const emails = formData.get('recipients');
    const orgName = formData.get('orgName');
    const eventName = formData.get('eventName');
    const timeOfEvent = formData.get('timeOfEvent');
    const placeOfEvent = formData.get('placeOfEvent');

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: username,
            pass: password
        }
    });

    try {
        const emailBody = await EventEmail(orgName, eventName, timeOfEvent, placeOfEvent);

        // Parse the emails if necessary (e.g., they could be a JSON string)
        const emailList = Array.isArray(emails) ? emails : JSON.parse(emails);  // Ensure it's an array

        const mail = await transporter.sendMail({
            from: username,
            bcc: emailList.join(','),
            subject: `Event Notification`,
            html: emailBody,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }

}