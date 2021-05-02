import {
  IsString,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ObjectID } from 'mongodb';

@InputType()
export class CommentType {
  @Field()
  @IsString()
  text: string;
  @Field()
  @IsString()
  taskId: ObjectID;

}
