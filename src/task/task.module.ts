import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.schema';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  providers: [TaskService, TaskResolver],
  exports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
})
export class TaskModule {}
