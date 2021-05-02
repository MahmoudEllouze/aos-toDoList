import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { GraphqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../types/user';
import { UserType } from '../models/user.type';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../shared/user-roles';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  /**
   * Get all users to share tasks with
   */
  @Query(returns => [UserType])
  async users() {
    return await this.userService.showAll();
  }

  @Query(returns => UserType)
  async user(@Args('email') email: string) {
    return await this.userService.getUser(email);
  }

  /**
   * Only the admin can delete users
   */
  @Roles('Admin', 'Owner')
  @Mutation(returns => UserType)
  async deleteUser(@Args('id') id: string, @CurrentUser() user: User) {
    return await this.userService.deleteUserById(id);
  }

  /**
   * Only the admin and the owner of the account can update user
   */
  @Mutation(returns => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('user') user: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    if (id === currentUser.id || currentUser.userRole === UserRoles.ADMIN) {
      return await this.userService.update(id, user, currentUser.userRole);
    } else {
      throw new UnauthorizedException();
    }
  }
}
