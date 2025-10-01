import StudentInterface from '@/types/StudentInterface';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<any[]> => {
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
        resolve(null);
        return;
      }

      // Мягкое удаление
      const updateSql = `UPDATE student SET isDeleted = TRUE WHERE id = ?`;
      db.run(updateSql, [studentId], function (updateErr) {
        if (updateErr) {
          db.close();
          reject(updateErr);
          return;
        }
        db.get(selectSql, [studentId], (getErr, updatedRow) => {
          db.close();
          if (getErr) {
            reject(getErr);
            return;
          }
          resolve(updatedRow as StudentInterface);
        });
      });
    });
  });

  return deletedStudent;
};

// export const deleteStudentDb = async (studentId: number): Promise<StudentInterface | null> => { const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db'); const deletedStudent = await new Promise<StudentInterface | null>((resolve, reject) => {  const selectSql = SELECT * FROM student WHERE id = ?; db.get(selectSql, [studentId], (selectErr, row) => { if (selectErr) { db.close(); reject(selectErr); return; } if (!row) { db.close(); resolve(null); return; } const deleteSql = DELETE FROM student WHERE id = ?; db.run(deleteSql, [studentId], function (deleteErr) { db.close(); if (deleteErr) { reject(deleteErr); return; } resolve(row as StudentInterface); }); }); }); return deletedStudent; };