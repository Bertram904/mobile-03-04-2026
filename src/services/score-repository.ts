import { Score } from '@/src/models/score';
import { getDatabase, initializeDatabase } from '@/src/services/database';

type ScoreRow = {
  id: number;
  codeStudent: string;
  subject: string;
  score: number;
};

export async function getScoresByStudentCode(codeStudent: string): Promise<Score[]> {
  await initializeDatabase();
  const db = getDatabase();
  const rows = await db.getAllAsync<ScoreRow>(
    'SELECT id, codeStudent, subject, score FROM scores WHERE codeStudent = ? ORDER BY id ASC;',
    [codeStudent]
  );

  return rows.map((row) => ({
    id: row.id,
    codeStudent: row.codeStudent,
    subject: row.subject,
    score: row.score,
  }));
}
