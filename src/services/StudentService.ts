// import AppDataSource from '@/db/AppDataSource';
// import { Student } from '@/db/entity/Student.entity';
// import type StudentInterface from '@/types/StudentInterface';
// import getRandomFio from '@/utils/getRandomFio';

// export class StudentService {
//   private get repository(): ReturnType<typeof AppDataSource.getRepository> {
//     // Check if AppDataSource is initialized
//     if (!AppDataSource.isInitialized) {
//       throw new Error('AppDataSource is not initialized');
//     }
//     return AppDataSource.getRepository(Student);
//   }

//   async getStudents(): Promise<StudentInterface[]> {
//     const students = await this.repository.find({ relations: ['group'] });
//     return students as StudentInterface[];
//   }

//   async getStudentById(id: number): Promise<Student | null> {
//     return await this.repository.findOne({
//       where: { id },
//       relations: ['group'],
//     }) as Student | null;
//   }

//   async deleteStudent(studentId: number): Promise<number> {
//     await this.repository.delete(studentId);
//     return studentId;
//   }

//   async addStudent(studentFields: Omit<StudentInterface, 'id'>): Promise<StudentInterface> {
//     const student = new Student();
//     const newStudent = await this.repository.save({
//       ...student,
//       ...studentFields,
//     });
//     return newStudent;
//   }

//   async addRandomStudents(amount: number = 10): Promise<StudentInterface[]> {
//     const students: StudentInterface[] = [];

//     for (let i = 0; i < amount; i++) {
//       const fio = getRandomFio();

//       const newStudent = await this.addStudent({
//         ...fio,
//         contacts: 'contact',
//         groupId: Math.floor(Math.random() * 4) + 1,
//       });
//       students.push(newStudent);

//       console.log(newStudent);
//     }

//     return students;
//   }
// }

// export const studentService = new StudentService();


// FIX THAT ERROR:
// [{
// 	"resource": "/c:/Users/skarnovichvm/Vki-next/src/services/StudentService.ts",
// 	"owner": "typescript",
// 	"code": "2322",
// 	"severity": 8,
// 	"message": "Type '{ uuid?: string | undefined; firstName: string; lastName: string; middleName: string; contacts?: string | undefined; groupId: number; isDeleted?: boolean | undefined; isNew?: boolean | undefined; group?: Group | ... 1 more ... | undefined; id: number; } & ObjectLiteral' is not assignable to type 'StudentInterface'.\n  Types of property 'group' are incompatible.\n    Type 'Group | GroupInterface | undefined' is not assignable to type 'GroupInterface | undefined'.\n      Type 'Group' is not assignable to type 'GroupInterface'.\n        Types of property 'contacts' are incompatible.\n          Type 'string | undefined' is not assignable to type 'string'.\n            Type 'undefined' is not assignable to type 'string'.",
// 	"source": "ts",
// 	"startLineNumber": 38,
// 	"startColumn": 5,
// 	"endLineNumber": 38,
// 	"endColumn": 11,
// 	"origin": "extHost1"
// }]