import nodemailer from 'nodemailer';

export const handler = async (event) => {
    try {
        const { to, subject, text, image } = JSON.parse(event.body);

        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.VITE_EMAIL_USER,  // Definido no painel da Netlify
            pass: process.env.VITE_EMAIL_PASS,  // Definido no painel da Netlify
        },
        });

        const mailOptions = {
        from: process.env.VITE_EMAIL_USER,
        to,
        subject,
        text,
        attachments: image ? [{ path: image }] : [],
        };

        await transporter.sendMail(mailOptions);

        return {
        statusCode: 200,
        body: JSON.stringify({ message: "Email enviado com sucesso!" }),
        };
    } catch (error) {
        return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erro ao enviar email" }),
        };
    }
};
