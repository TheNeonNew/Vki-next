// import AppDataSource from '@/db/AppDataSource';
// import { Group } from '@/db/entity/Group.entity';
// import type GroupInterface from '@/types/GroupInterface';

// export class GroupService {
//   private get repository(): ReturnType<typeof AppDataSource.getRepository> {
//     return AppDataSource.getRepository(Group);
//   }

//   async getGroups(): Promise<GroupInterface[]> {
//     const groups = await this.repository.find({ relations: ['students'] });
//     return groups as GroupInterface[];
//   }

//   async getGroupsById(id: number): Promise<GroupInterface> {
//     const groups = await this.repository.findOne({ relations: ['students'], where: { id } });
//     return groups as GroupInterface;
//   }

//   async addGroup(groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> {
//     const group = new Group();
//     const newGroup = await this.repository.save({
//       ...group,
//       ...groupFields,
//     });

//     return newGroup;
//   }
// }

// export const groupService = new GroupService();

//TODO: FIX THAT ERR 
//Type '{ students: StudentInterface[] | Student[]; name: string; contacts: string; id: number; } & ObjectLiteral' is not assignable to type 'GroupInterface'.
//  Types of property 'students' are incompatible.
//    Type 'StudentInterface[] | Student[]' is not assignable to type 'StudentInterface[] | undefined'.
//      Type 'Student[]' is not assignable to type 'StudentInterface[]'.
//        Type 'Student' is not assignable to type 'StudentInterface'.
//          Types of property 'group' are incompatible.
//             Type 'Group | undefined' is not assignable to type 'GroupInterface | undefined'.
//               Type 'Group' is not assignable to type 'GroupInterface'.
//                 Types of property 'contacts' are incompatible.
//                   Type 'string | undefined' is not assignable to type 'string'.
//                     Type 'undefined' is not assignable to type 'string'.