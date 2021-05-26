import { encode } from 'jwt-simple';
import { JWT_TOKEN_SECRET } from '@/core/constants';
import { getUserByUsername } from '@/server/database/access';
import { AppSignInModel, AppUser } from '@/core/models/domain';

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
  const token = encode(appUser, JWT_TOKEN_SECRET);
  return { user: appUser, token };
};
