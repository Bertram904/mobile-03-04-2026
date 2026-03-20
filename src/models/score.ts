export type Score = {
  id: number;
  codeStudent: string;
  subject: string;
  score: number;
};

export type StudentScoreView = {
  student: {
    code: string;
    name: string;
    className: string;
  };
  scores: Score[];
};
