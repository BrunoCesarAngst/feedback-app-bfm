import nodemailer from "nodemailer";
import { ISendMailData, MailAdapter } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2e6bb04286fafc",
    pass: "e2c7cb5b4e782a"
  }
});


export class NodemailerMailAdapter implements MailAdapter {

  async sendMail({ subject, body }: ISendMailData) {
    await transport.sendMail({
    from: 'Feed feedback <ola@feddback.com>',
    to: 'Bruno Angst <bruno.angst@rede.ulbra.br>',
    subject,
    html: body
  })
  }
}