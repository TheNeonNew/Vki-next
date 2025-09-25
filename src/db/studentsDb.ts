import sqlite3 from 'sqlite3';
import GroupInterface from '@/types/GroupInterface';

sqlite3.verbose();

const db = new sqlite3.Database('./db/vki-web.db');

export const getStudentsDb = (): Promise<GroupInterface[]> => {
  return new Promise((resolve, reject) => {
    const groups: GroupInterface[] = [];

    db.serialize(() => {
      db.each('SELECT * FROM student', (err, row) => {
        if (err) {
          reject(err);
        } else {
          groups.push(row as GroupInterface);
        }
      }, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(groups);
        }
      });
    });
  });
};
