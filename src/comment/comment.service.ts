import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../types/comment';
import { CommentModel } from '../models/comment.type';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentModel>,
  ) {}

  async getCommentsByTask(taskId: String): Promise<CommentModel[]> {
    return await this.commentModel
      .find({ taskId: taskId.toString() })
      .populate('ownerId');
  }

  async createComment(comment: Comment): Promise<CommentModel> {
    const createdComment = new this.commentModel(comment);
    return await createdComment.save();
  }
}
