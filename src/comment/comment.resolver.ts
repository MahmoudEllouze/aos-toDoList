import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { GraphqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { User } from '../types/user';
import { CommentType } from './dto/comment.input';
@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query()
  async getCommentsByTask(
    @Args('taskId') taskId: string,
    @CurrentUser() currentUser: User,
  ) {
    return await this.commentService.getCommentsByTask(taskId);
  }

  @Mutation(returns => CommentType)
  async addComment(
    @Args('comment') comment: CommentType,
    @CurrentUser() currentUser: User,
  ) {
    const thisComment: any = comment;
    thisComment.ownerId = currentUser;
    try {
      const response: CommentType = await this.commentService.createComment(
        thisComment,
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  }
}
