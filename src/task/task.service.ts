import {
  Injectable,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../types/task';
import { TaskType } from '../models/task.type';
import { UpdateTaskInput } from './dto/task.input';
import { User } from 'src/types/user';
import { AuthenticationError } from 'apollo-server-core';
import { UserRoles } from 'src/shared/user-roles';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<TaskType>,
  ) {}

  async showAll(): Promise<TaskType[]> {
    return await this.taskModel.find();
  }

  async showOwnedTasks(currentUser: User): Promise<TaskType[]> {
    return await this.taskModel.find({ ownerId: currentUser.id });
  }

  async showSharedTasks(currentUser: User): Promise<TaskType[]> {
    return await this.taskModel
      .find({ sharedWith: currentUser.id })
      .populate('ownerId');
  }

  async showTask(id: string, currentUser: User): Promise<TaskType> {
    const viewedTask = await this.taskModel.findById(id).populate('ownerId');
    this.checkTaskPermission(viewedTask, currentUser);
    return viewedTask;
  }

  async create(toDoListDTO: Task): Promise<TaskType> {
    const createdUser = new this.taskModel(toDoListDTO);
    return await createdUser.save();
  }

  async update(id: string, newTask: UpdateTaskInput, currentUser: User) {
    const task: TaskType = await this.taskModel.findOne({ _id: id });

    if (task === undefined || task === null) {
      throw new HttpException(`Task doesn't exists`, HttpStatus.BAD_REQUEST);
    }
    this.checkTaskPermission(task, currentUser);
    if (
      newTask.sharedWith != null &&
      currentUser.id != task.ownerId.toString()
    ) {
      throw new HttpException(
        `Only owner can share task`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateTask = {
      name: newTask.name || task.name,
      description: newTask.description || task.description,
      isDone: newTask.isDone || task.isDone,
      sharedWith: newTask.sharedWith || task.sharedWith,
    };
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      {
        ...updateTask,
      },
      {
        new: true,
      },
    );
    return updatedTask;
  }

  async deleteTask(id: string, currentUser: User) {
    const task = await this.taskModel.findById(id);

    if (task === undefined || task === null) {
      throw new HttpException(`Task doesn't exists`, HttpStatus.BAD_REQUEST);
    }
    if (
      task.ownerId.toString() != currentUser.id &&
      currentUser.userRole == UserRoles.ADMIN
    ) {
      throw new AuthenticationError('Wrong permissions for this request');
    }
    return await this.taskModel.findByIdAndRemove(id);
  }

  /**
   * Function to check if user can see or update a task
   */
  checkTaskPermission(task: TaskType, currentUser: User): void {
    if (
      !(
        task.sharedWith.includes(currentUser.id) ||
        task.ownerId.toString() == currentUser.id ||
        currentUser.userRole == UserRoles.ADMIN
      )
    ) {
      throw new AuthenticationError('Wrong permissions for this request');
    }
  }
}
