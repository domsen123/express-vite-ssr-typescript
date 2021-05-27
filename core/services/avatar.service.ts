import { MD5 } from 'crypto-js';
import { AppUser, AppUserWithAvatar } from '../models/domain';
export const getUserAvatarUrl = (mail: string, avatarEndpointUrl?: string) => {
  if (avatarEndpointUrl) {
    return `${avatarEndpointUrl}&mail=${mail}`;
  }
  return `https://www.gravatar.com/avatar/${MD5(mail)}?s=120&d=identicon`;
};

export const setUserAvatar = (user: AppUser, avatarEndpointUrl?: string) => {
  (user as AppUserWithAvatar).avatar = getCurrentUserAvatar(
    user.mail,
    avatarEndpointUrl
  );
};

export const getCurrentUserAvatar = (
  mail: string,
  avatarEndpointUrl?: string
) => getUserAvatarUrl(mail, avatarEndpointUrl);
