import { Group } from './entity/Group.entity';
import GroupInterface from '@/types/GroupInterface';
import { initializeDataSource } from './AppDataSource';

export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  const dataSource = await initializeDataSource();
  const groupRepo = dataSource.getRepository(Group);
  return groupRepo.find();
};

export const addGroupsDb = async (groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> => {
  const dataSource = await initializeDataSource();
  const groupRepository = dataSource.getRepository(Group);

  const group = groupRepository.create(groupFields);
  const newGroup = await groupRepository.save(group);

  return newGroup;
};

