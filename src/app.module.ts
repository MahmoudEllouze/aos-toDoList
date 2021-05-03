import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import 'dotenv/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { CommentModule } from './comment/comment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const host = process.env.DATABASE_HOST || 'localhost';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      playground: true,
      introspection: true, //introspection is set to true to allow the graphQL playground in production mode
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    }),
    MongooseModule.forRoot(`mongodb://${host}/aosToDoList`),
    UserModule,
    AuthModule,
    TaskModule,
    CommentModule,
  ],
  controllers: [AppController],

  providers: [
    AppService,
    /**
     * Adding an interceptor for every mutation and querries calls and log it in the console
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    /**
     * Adding an filter to catch http exeptions and return it to the client in a readable object
     */
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
