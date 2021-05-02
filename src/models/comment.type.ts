import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import * as mongoose from 'mongoose';

@ObjectType()
export class CommentModel extends Document {
  @Field()
  @IsString()
  text: string;
  @Field()
  @IsString()
  ownerId: ObjectID;
  @Field()
  @IsString()
  taskId: ObjectID;
}
