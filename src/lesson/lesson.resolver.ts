import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "../student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService, private studentService: StudentService) { }

  @Query(returns => LessonType)
  getLesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(returns => [LessonType])
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Mutation(returns => LessonType)
  createLesson(@Args('input') dto: CreateLessonInput) {
    return this.lessonService.createLesson(dto);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(@Args('input') dto: AssignStudentsToLessonInput) {
    return this.lessonService.assignStudentsToLesson(dto);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}