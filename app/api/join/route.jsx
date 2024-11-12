'use server'
import { NextResponse, NextRequest } from 'next/server'
import { JoinEmail } from './template'
import nodemailer from 'nodemailer';

// Handles POST requests to /api

export async function POST(request) {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;


    const formData = await request.formData()
    const to = formData.get('email')

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
            subject: `Welcome to Timeventory`,
            html: JoinEmail,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }

}