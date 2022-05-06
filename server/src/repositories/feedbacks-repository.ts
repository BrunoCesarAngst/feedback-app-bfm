

export interface IFeedbackRepository {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackRepository {
  create: (data: IFeedbackRepository) => Promise<void>;
}