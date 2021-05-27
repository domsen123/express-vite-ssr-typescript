import users from '@/_mock/users';
import { AppUserWithPassword } from '@/core/models/domain';

export const getUserByUsername = (
  username: string
): Promise<AppUserWithPassword | undefined> =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const user = users.find((u) => u.username === username);
        resolve(user);
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
