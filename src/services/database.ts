import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('app.db');

let initialized = false;

export async function initializeDatabase() {
  if (initialized) {
    return;
  }

  await database.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS accounts (
      username TEXT PRIMARY KEY NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
      code TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      className TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codeStudent TEXT NOT NULL,
      subject TEXT NOT NULL,
      score REAL NOT NULL,
      FOREIGN KEY (codeStudent) REFERENCES students(code) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_done INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const accountCount = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM accounts;'
  );

  if ((accountCount?.count ?? 0) === 0) {
    await database.runAsync(
      'INSERT INTO accounts (username, password, role) VALUES (?, ?, ?), (?, ?, ?);',
      ['s001', '123456', 'student', 'admin', 'admin123', 'admin']
    );
  }

  const studentCount = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM students;'
  );

  if ((studentCount?.count ?? 0) === 0) {
    await database.runAsync('INSERT INTO students (code, name, className) VALUES (?, ?, ?);', [
      's001',
      'Nguyen Van A',
      'SE1701',
    ]);
  }

  const scoreCount = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM scores;'
  );

  if ((scoreCount?.count ?? 0) === 0) {
    await database.runAsync(
      'INSERT INTO scores (codeStudent, subject, score) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?);',
      ['s001', 'Math', 8.5, 's001', 'Physics', 7.8, 's001', 'English', 9.1]
    );
  }

  initialized = true;
}

export function getDatabase() {
  return database;
}
