import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config()



export const client = new MailtrapClient({ endpoint: process.env.EMAILTARAP_ENDPOINT, token: process.env.EMAILTARAP_TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Ahmed",
};


