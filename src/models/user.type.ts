import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { UserRoles } from '../shared/user-roles';
import {Document} from 'mongoose'
@ObjectType()
export class UserType extends Document{
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
  @Field()
  @IsOptional()
  userRole: UserRoles;
}
