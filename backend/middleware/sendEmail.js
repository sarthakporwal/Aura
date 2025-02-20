const nodemailer = require('nodemailer');

const sendEmail = async (email, subj, text) => {
    try {
        // authentication for smtp service --> gmail 
        let config = {
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        }
        
        // creating a transporter for transporting the mail
        let transporter = nodemailer.createTransport(config);
        
        // sending the mail
        await transporter.sendMail({
            from: process.env.MY_EMAIL,
            to: email,
            subject: subj,
            text: text
        });
        console.log('hello');
        console.log("Email sent succesfully");
    } catch (error) {
        console.log('Email not sent ' + error);
    }
}
module.exports = sendEmail; // exporting the mail