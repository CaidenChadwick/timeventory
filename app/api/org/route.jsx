'use server'
import { NextResponse, NextRequest } from 'next/server'
import { OrgEmail } from './template'
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(request, email) {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;


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



        const mail = await transporter.sendMail({
            from: username,
            to: to,
            replyTo: myEmail,
            subject: `Event Subject Line`,
            html: OrgEmail,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }

}