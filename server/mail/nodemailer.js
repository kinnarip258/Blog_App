//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const nodemailer = require('nodemailer');

//========================== Load Modules End =============================

//============================= SendMail To User Start =============================

const sendMail = ({toUser, user}) => {

    //============================= Create Transport Start =============================
    const transport = nodemailer.createTransport(
        {
            //============================= Services For Email =============================
            service: 'Gmail',
            //============================= Authenticate UserName And Password =============================
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        }
    );
    //============================= Create Transport End =============================

    //============================= Message Send With Email Start =============================
    const Message = {
        from: process.env.USER,
        to: toUser,
        subject: `hello ${user.fname} ${user.lname}, using Nodejs`,
        html: `
            <h2>Thank You For Registering into our application.</h2>
            <h4>Your details: </h4>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Profession: ${user.profession}</p>
            <p>Salary: ${user.salary}</p>
        `
    };
    //============================= Message Send With Email End =============================
    
    //============================= Send Email Start =============================
    transport.sendMail(Message, (error, info) => {
        if(error){
            //============================= Error Message =============================
            console.log(error);
            
        }
        else{
            //============================= Successfull Email Send Message  =============================
            console.log("Email Send: " + info.response);
            
        }
    });
    //============================= Send Email End =============================

}

//============================= SendMail To User End =============================

//========================== Export Module Start ===========================

module.exports = sendMail;

//========================== Export module end ==================================
