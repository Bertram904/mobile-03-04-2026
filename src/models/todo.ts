export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: string;
};

export type CreateTodoInput = {
  title: string;
};
