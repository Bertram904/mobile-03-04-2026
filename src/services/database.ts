import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('app.db');

let initialized = false;

export async function initializeDatabase() {
  if (initialized) {
    return;
  }

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_done INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  initialized = true;
}

export function getDatabase() {
  return database;
}
