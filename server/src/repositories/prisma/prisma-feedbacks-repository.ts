import { prisma } from "../../prisma";
import { FeedbackRepository, IFeedbackRepository } from "../feedbacks-repository";

export class PrimaFeedbacksRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: IFeedbackRepository) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    })
  }
}