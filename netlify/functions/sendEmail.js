import nodemailer from "nodemailer";

export async function handler(event) {
    try {
        // Verifica se há dados na requisição
        if (!event.body) {
            throw new Error("Corpo da requisição está vazio!");
        }

        const { to, subject, html } = JSON.parse(event.body);

        // Verifica se os parâmetros necessários foram enviados
        if (!to || !subject || !html) {
            throw new Error("Parâmetros inválidos!");
        }

        // Pega as variáveis de ambiente diretamente do Netlify
        const emailUser = process.env.VITE_EMAIL_USER;
        const emailPass = process.env.VITE_EMAIL_PASS;

        // Verifica se as variáveis de ambiente estão corretamente configuradas
        if (!emailUser || !emailPass) {
            throw new Error("Variáveis de ambiente não estão configuradas corretamente.");
        }

        // Cria o transporte para o envio do e-mail
        let transporter = nodemailer.createTransport({
            service: "gmail", // Pode mudar conforme o serviço de e-mail que está usando
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // Cria as opções do e-mail
        let mailOptions = {
            from: emailUser,
            to,
            subject,
            html, // conteúdo HTML do e-mail
        };

        // Envia o e-mail
        let info = await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "E-mail enviado com sucesso!", info }),
        };
    } catch (error) {
        // Retorna erro se algo der errado
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Erro ao enviar e-mail", error: error.message }),
        };
    }
}
