import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';
import { User } from './entity/User.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web-orm.db',
  entities: [Group, Student, User],
  synchronize: process.env.NODE_ENV !== 'production', // Отключаем в production
  migrationsRun: process.env.NODE_ENV === 'production', // Включаем миграции в production
  logging: false,
});

export const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('✅ Data Source initialized');
    } catch (err) {
      console.error('❌ Error during Data Source initialization:', err);
      throw err;
    }
  }
  return AppDataSource;
};

export default AppDataSource;