import "dotenv/config";
import nodemailer from "nodemailer";

export async function handler(event) {
    try {
        const { to, subject, html } = JSON.parse(event.body);

        const emailUser = process.env.VITE_EMAIL_USER;
        const emailPass = process.env.VITE_EMAIL_PASS;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        let mailOptions = {
            from: emailUser,
            to,
            subject,
            html,
        };

        let info = await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "E-mail enviado com sucesso!", info }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Erro ao enviar e-mail", error: error.message }),
        };
    }
}
