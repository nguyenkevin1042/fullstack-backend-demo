
"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();



//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let finalHtml = "<h3> Xin chào " + dataSend.patientName + "</h3>" +
        "<p> - Bạn nhận được email này vì đã đặt lịch hẹn thành công.</p>" +
        "<p>- Thông tin lịch hẹn:</p>" +
        "<ul>" +
        "<li>Thời gian: " + dataSend.time + "</li>" +
        "<li>Lý do khám: " + dataSend.reason + " </li>" +
        // "<li>Giá khám:" + dataSend.price + " </li>" +
        "</ul>"

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Tien Nguyen 👻" <nguyenkevin1042@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: finalHtml // html body
    });

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}