import { CreateTodoInput, Todo } from '@/src/models/todo';
import { addTodo, getTodos, removeTodo, updateTodoStatus } from '@/src/services/todo-repository';

export class TodoController {
  async list(): Promise<Todo[]> {
    return getTodos();
  }

  async create(input: CreateTodoInput): Promise<void> {
    const title = input.title.trim();
    if (!title) {
      throw new Error('Tiêu đề không được để trống');
    }

    await addTodo(title);
  }

  async toggleDone(todo: Todo): Promise<void> {
    await updateTodoStatus(todo.id, !todo.isDone);
  }

  async delete(todoId: number): Promise<void> {
    await removeTodo(todoId);
  }
}
