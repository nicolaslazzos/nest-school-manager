import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

  async createStudent(dto: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = dto;

    const lesson = this.studentRepository.create({ id: uuid(), firstName, lastName });

    return this.studentRepository.save(lesson);
  }

  async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getManyStudents(studentIds: string[]) {
    return this.studentRepository.find({ where: { id: { $in: studentIds } } });
  }
}
