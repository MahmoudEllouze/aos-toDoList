import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { ObjectID } from 'mongodb';
import * as mongoose from 'mongoose';

@ObjectType()
export class TaskType extends Document {
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsString()
  description: string;
  @Field()
  @IsString()
  ownerId: ObjectID;
  @Field()
  @IsBoolean()
  isDone: boolean;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObjectID)
  sharedWith: string[];
}

