import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = "973a2094b63b9ba516e36aef6e06365b";
const ENDPOINT = "https://send.api.mailtrap.io/";

export const client = new MailtrapClient({ endpoint: process.env.EMAILTARAP_ENDPOINT, token: process.env.EMAILTARAP_TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Ahmed",
};


