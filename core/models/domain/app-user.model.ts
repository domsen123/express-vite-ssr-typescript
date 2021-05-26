export interface AppUser {
  firstname: string;
  lastname: string;
  displayname: string;
  username: string;
  mail: string;
}

export interface AppUserWithAvatar extends AppUser {
  avatar: string;
}

export interface AppUserWithPassword extends AppUser {
  password: string;
}

export const getBlankUserWithAvatar = (): AppUserWithAvatar => ({
  firstname: '',
  lastname: '',
  displayname: '',
  username: '',
  mail: '',
  avatar: '',
});
