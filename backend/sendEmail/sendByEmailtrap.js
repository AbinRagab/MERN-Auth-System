import { response } from "express";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../utils/htmlTempletes.js";
import { client, sender } from "./emailtrap.config.js";

export const sendByEmailtrap = async (email,confirmEmailCode )=>{

    const recipients = [
        {
          email,
        }
      ];

      try {
        const response = await client.send({
        from: sender,
        to: recipients,
        subject: "Confirmation Your Account",
        html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',confirmEmailCode),
        category: "verification Account",
      })

      console.log('Email is Sent Successfully', response);    
      } catch (err) {
        console.log(`Email Sending Faild: ${err}`);
        if(response.success !== true) return next(new Error('sending Email Is Not Complete!'))
      }
    
}

export const sendWelcomeEmail = async(email, name)=>{
    const recipients = [
        {
          email,
        }
      ];


try {
    const response = await client.send({
        from: sender,
        to: recipients,
        template_uuid: "0947c1d8-80aa-4cb3-b80a-56ed7fd7a2c9",
        template_variables: {
          "company_info_name": "Auth System",
          "name": name
        }
      })

      console.log('Welcome Email Send Successfully', response);
      
} catch (error) {
   console.log('Error in Sending welcome Email', error);
   if(response.success !== true) next(new Error('Error in Sending welcome Email'))
}}


export const sendEmailForgetPassword = async (email,reseturl,res)=>{

    const recipients = [
        {
          email,
        }
      ];

      try {
        const response = await client.send({
        from: sender,
        to: recipients,
        subject: "Reset Your Password",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',reseturl),
        category: "Reset Your Password",
      })

      console.log('Email is Sent Successfully To RESET_REQUEST password ', response);    
      } catch (err) {
        console.log(`Email Sending Faild: ${err}`);
        if(response.success !== true) {
            res.json({
                success: false,
                message: err.message
            })
        }
      }
    
}

export const sendEmailUpdatedPassword = async (email,res)=>{

    const recipients = [
        {
          email,
        }
      ];

      try {
        const response = await client.send({
        from: sender,
        to: recipients,
        subject: "Password Reseted Successfully",
        html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Reset Your Password",
      })

      console.log('Email is Sent Successfully To RESET_SUCCESS password ', response);    
      } catch (err) {
        console.log(`Email Sending Faild: ${err}`);
        if(response.success !== true) {
            res.json({
                success: false,
                message: err.message
            })
        }
      }
    
}