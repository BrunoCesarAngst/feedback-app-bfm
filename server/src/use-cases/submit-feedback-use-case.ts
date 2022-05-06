import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";


interface ISubmitFeedbackUseCase {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: ISubmitFeedbackUseCase) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type are required');
    }

    if (!comment) {
      throw new Error('Comment are required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot');
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<h3>Novo feedback de ${type}</h3>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : '',
        `</div>`
      ].join('\n')
    })
  }
}