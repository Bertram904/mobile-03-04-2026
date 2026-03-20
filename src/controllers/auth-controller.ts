import { Account, LoginInput } from '@/src/models/account';
import { findAccountByCredentials } from '@/src/services/account-repository';

export class AuthController {
  async login(input: LoginInput): Promise<Account> {
    const username = input.username.trim();
    const password = input.password.trim();

    if (!username || !password) {
      throw new Error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
    }

    const account = await findAccountByCredentials(username, password);
    if (!account) {
      throw new Error('Sai tài khoản hoặc mật khẩu.');
    }

    return account;
  }
}
