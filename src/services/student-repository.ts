import { Student } from '@/src/models/student';
import { getDatabase, initializeDatabase } from '@/src/services/database';

export async function findStudentByCode(code: string): Promise<Student | null> {
  await initializeDatabase();
  const db = getDatabase();
  const row = await db.getFirstAsync<Student>(
    'SELECT code, name, className FROM students WHERE code = ? LIMIT 1;',
    [code]
  );

  return row ?? null;
}
