import {
  AppSignInModel,
  AppUser,
  AppUserWithPassword,
} from '@/core/models/domain';
import { encode, decode } from 'jwt-simple';
import users from '@/_mock/users';

/*  DB MOCK FUNCTIONS 
    Should be in Data Access Model eg server/db-access
*/
const getUserByUsername = (
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
//#endregion

export const SignInService = async (
  signInModel: AppSignInModel
): Promise<{ user: AppUser; token: string }> => {
  const { username, password } = signInModel;
  const user = await getUserByUsername(username);
  if (!user) throw { status: 404, message: `User does not exists.` };
  if (user.password !== password)
    throw { status: 401, message: `Password does not match.` };
  const appUser: AppUser = {
    displayname: user.displayname,
    firstname: user.firstname,
    lastname: user.lastname,
    mail: user.mail,
    username: user.username,
  };
  const token = encode(appUser, `super_secure_token_secret`);
  return { user, token };
};
