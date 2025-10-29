import StudentInterface from '@/types/StudentInterface';
import FioInterface from '@/types/FioInterface';
import getRandomFio from '@/utils/getRandomFio';
import sqlite3 from 'sqlite3';


sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        student.id,
        student.first_name,
        student.last_name,
        student.middle_name,
        student.groupId,
        class.name AS group_name
      FROM student
      JOIN class ON student.groupId = class.id
    `;
    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });

  return students as StudentInterface[];
};


export const deleteStudentDb = async (studentId: number): Promise<StudentInterface | null> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const deletedStudent = await new Promise<StudentInterface | null>((resolve, reject) => {
    const selectSql = `SELECT * FROM student WHERE id = ?`;
    db.get(selectSql, [studentId], (selectErr, row) => {
      if (selectErr) {
        db.close();
        reject(selectErr);
        return;
      }
      if (!row) {
        db.close();
        resolve(null); // Студент не найден
        return;
      }

      const deleteSql = `DELETE FROM student WHERE id = ?`;
      db.run(deleteSql, [studentId], function (deleteErr) {
        db.close();
        if (deleteErr) {
          reject(deleteErr);
          return;
        }
        resolve(row as StudentInterface); // Возвращаем удалённого студента
      });
    });
  });

  return deletedStudent;
};

export const addRandomStudentsDb = async (amount: number = 10): Promise<FioInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const fios: FioInterface[] = [];
  let fiosInsert: string = ''
  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    fios.push(fio);
    fiosInsert += `('${fio.firstName}', '${fio.lastName}', '${fio.middleName}', 1)`;
    fiosInsert += `${i === amount - 1 ? ';' : ','}`;
  }

  await new Promise((resolve, reject) => {
    db.run(`INSERT INTO student (first_name, last_name, middle_name, groupId) VALUES ${fiosInsert}`, [], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(fios);
      db.close();
    });
  });

  return fios;
};

export const addNRStudentDb = async (student: StudentInterface): Promise<StudentInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const result = await new Promise<StudentInterface>((resolve, reject) => {
    const sql = `
      INSERT INTO student(first_name, last_name, middle_name, groupId)
      VALUES(?, ?, ?, ?)
      RETURNING id, first_name, last_name, middle_name, groupId
    `;

    db.get(sql, [student.first_name, student.last_name, student.middle_name, student.groupId], (err, row) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }

      resolve(row as StudentInterface);
      db.close();
    });
  });

  return result;
};
