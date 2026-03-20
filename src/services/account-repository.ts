import { Account } from '@/src/models/account';
import { getDatabase, initializeDatabase } from '@/src/services/database';

export async function findAccountByCredentials(
  username: string,
  password: string
): Promise<Account | null> {
  await initializeDatabase();
  const db = getDatabase();
  const row = await db.getFirstAsync<Account>(
    'SELECT username, password, role FROM accounts WHERE username = ? AND password = ? LIMIT 1;',
    [username, password]
  );

  return row ?? null;
}
