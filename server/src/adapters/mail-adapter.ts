

export interface ISendMailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: ISendMailData) => Promise<void>;
}