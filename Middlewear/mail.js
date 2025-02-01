const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

const sendRegistrationEmail = (email,event) =>{
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Succesful Event Regstration',
        text: `Hello,

You have successfully registered for the event: ${event.description}.

Event Details:
Date: ${event.date}
Time: ${event.time}

Thank you for registering!

Best regards,
Event Team`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log('Error sending mail',error)
        }else{
            console.log("Email Sent ",info.response)
        }
    })
}

module.exports = sendRegistrationEmail