import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) { }

  async createLesson(dto: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = dto;

    const lesson = this.lessonRepository.create({ id: uuid(), name, startDate, endDate, students });

    return this.lessonRepository.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(dto: AssignStudentsToLessonInput): Promise<Lesson> {
    const { lessonId, studentIds } = dto;

    const lesson = await this.lessonRepository.findOne({ id: lessonId });

    lesson.students = Array.from(new Set([...lesson.students, ...studentIds]));

    return this.lessonRepository.save(lesson);
  }
}
