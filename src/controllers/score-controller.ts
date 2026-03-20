import { StudentScoreView } from '@/src/models/score';
import { getScoresByStudentCode } from '@/src/services/score-repository';
import { findStudentByCode } from '@/src/services/student-repository';

export class ScoreController {
  async getStudentScores(studentCode: string): Promise<StudentScoreView> {
    const normalizedCode = studentCode.trim();
    if (!normalizedCode) {
      throw new Error('Mã sinh viên không hợp lệ.');
    }

    const student = await findStudentByCode(normalizedCode);
    if (!student) {
      throw new Error('Không tìm thấy sinh viên tương ứng.');
    }

    const scores = await getScoresByStudentCode(student.code);

    return {
      student,
      scores,
    };
  }
}
