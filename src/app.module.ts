import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://nicolaslazzos:password@127.0.10.1:27017/nest-school-manager?authSource=admin&readPreference=primary&ssl=false',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    LessonModule,
    StudentModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
