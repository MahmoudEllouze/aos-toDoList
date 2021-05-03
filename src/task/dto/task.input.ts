import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ObjectID } from 'mongodb';

@InputType()
export class createTaskType {
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsString()
  description: string;
  @Field()
  @IsBoolean()
  isDone: boolean;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ObjectID)
  sharedWith: string[];
}

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isDone?: boolean;
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObjectID)
  sharedWith?: string[];
}
