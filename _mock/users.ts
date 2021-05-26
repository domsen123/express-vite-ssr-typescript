import { AppUserWithPassword } from '@/core/models/domain';

const users: AppUserWithPassword[] = [
  {
    firstname: 'App',
    lastname: 'Root',
    displayname: 'App Root',
    username: 'root',
    mail: 'root@app.local',
    password: 'pass4word',
  },
];

export default users;
