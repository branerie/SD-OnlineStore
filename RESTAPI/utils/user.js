const nodemailer = require('nodemailer')

const getTransporter = () => {
    if (process.env.NODE_ENV === process.env.ENVIRONMENT_DEV) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'infofindyou9@gmail.com',
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            // accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
            // expires: 1484314697598
        }
    })
}

const sendConfirmationEmail = async (firstName, lastName, email, confirmationToken) => {
    const transporter = getTransporter()

    const server_url = process.env.NODE_ENV === process.env.ENVIRONMENT_DEV
        ? process.env.URL_DEV
        : process.env.URL_PROD

    const info = await transporter.sendMail({
        from: `"Find You" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Please confirm your registration`,
        text: `
        Dear ${firstName} ${lastName},
        Welcome to Find You!
        
        Please confirm your registration by following the link below:
        ${server_url}/user/confirm/${confirmationToken}

        Thank you for trusting us and we hope you find yourself on our website :)

        Best regards,
        The Find You team
        `
    })
}

const sendPasswordResetEmail = async (firstName, lastName, email, resetToken) => {
    const transporter = getTransporter()

    const server_url = process.env.NODE_ENV === process.env.ENVIRONMENT_DEV
        ? process.env.URL_DEV
        : process.env.URL_PROD

    const info = await transporter.sendMail({
        from: `"Find You" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Password reset request`,
        text: `
        Dear ${firstName ? firstName : ''} ${lastName ? lastName : ''} ${(!firstName && !lastName) ? 'User' : ''},
        
        Someone has requested to reset the password of your account on ${server_url.split('//')[1]}.
        If this was you, please follow the link below. It will take you to a secure page where you can reset your password. The page will expire in one hour.
        ${server_url}/user/password/reset/${resetToken}

        Please ignore this message if the request was not made by you!

        Hope you have a good day and you keep finding yourself on our website :)

        Best regards,
        The Find You team
        `
    })
}

module.exports = {
    sendConfirmationEmail,
    sendPasswordResetEmail
}