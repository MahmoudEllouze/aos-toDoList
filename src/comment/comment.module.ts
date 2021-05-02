import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  providers: [CommentService, CommentResolver],
  exports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
})
export class CommentModule {}
