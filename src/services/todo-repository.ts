import { Todo } from '@/src/models/todo';
import { getDatabase, initializeDatabase } from '@/src/services/database';

function mapTodo(row: {
  id: number;
  title: string;
  is_done: number;
  created_at: string;
}): Todo {
  return {
    id: row.id,
    title: row.title,
    isDone: row.is_done === 1,
    createdAt: row.created_at,
  };
}

export async function getTodos(): Promise<Todo[]> {
  await initializeDatabase();
  const db = getDatabase();
  const rows = await db.getAllAsync<{
    id: number;
    title: string;
    is_done: number;
    created_at: string;
  }>('SELECT id, title, is_done, created_at FROM todos ORDER BY id DESC;');

  return rows.map(mapTodo);
}

export async function addTodo(title: string): Promise<void> {
  await initializeDatabase();
  const db = getDatabase();
  await db.runAsync('INSERT INTO todos (title, is_done) VALUES (?, 0);', [title.trim()]);
}

export async function updateTodoStatus(id: number, isDone: boolean): Promise<void> {
  await initializeDatabase();
  const db = getDatabase();
  await db.runAsync('UPDATE todos SET is_done = ? WHERE id = ?;', [isDone ? 1 : 0, id]);
}

export async function removeTodo(id: number): Promise<void> {
  await initializeDatabase();
  const db = getDatabase();
  await db.runAsync('DELETE FROM todos WHERE id = ?;', [id]);
}
