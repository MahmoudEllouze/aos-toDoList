import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { createTaskType, UpdateTaskInput } from './dto/task.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { User } from '../types/user';
import { TaskType } from '../models/task.type';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}
  @Query()
  async tasks() {
    return await this.taskService.showAll();
  }
  /**
   * Show tasks owned by current user
   */
  @Query()
  async myTasks(@CurrentUser() currentUser: User) {
    return await this.taskService.showOwnedTasks(currentUser);
  }

  /**
   * Show tasks where user is part of shared users list
   */
  @Query()
  async sharedTasks(@CurrentUser() currentUser: User) {
    return await this.taskService.showSharedTasks(currentUser);
  }

  @Query()
  async showTask(@Args('id') id: string, @CurrentUser() currentUser: User) {
    return await this.taskService.showTask(id, currentUser);
  }

  @Mutation(returns => TaskType)
  async createTask(
    @Args('task') task: createTaskType,
    @CurrentUser() currentUser: User,
  ) {
    const thisTask: any = task;
    thisTask.ownerId = currentUser;
    try {
      const response: TaskType = await this.taskService.create(thisTask);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  @Mutation(returns => TaskType)
  async updateTask(
    @Args('id') id: string,
    @Args('task') task: UpdateTaskInput,
    @CurrentUser() currentUser: User,
  ) {
    const thisTask: any = task;
    thisTask.ownerId = currentUser;
    try {
      return await this.taskService.update(id, task, currentUser);
    } catch (exception) {
      throw exception;
    }
  }

  @Mutation(returns => TaskType)
  async deleteTask(@Args('id') id: string, @CurrentUser() currentUser: User) {
    return await this.taskService.deleteTask(id, currentUser);
  }
}
