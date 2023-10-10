import { makeAutoObservable } from 'mobx';

import DrawerContext from '../../../shared/lib/DrawerContext/DrawerContext';

export interface IUser {
  id: string;
  name: string;
  color: string;
}

export interface IExternalUser extends IUser {
  context: DrawerContext;
}

class UserStore {
  users = new Map<string, IExternalUser>();
  currentUser: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentUser(currentUser: IUser) {
    this.currentUser = currentUser;
  }

  addUser(user: IExternalUser) {
    this.users.set(user.id, user);
  }

  removeUser(userId: string) {
    if (this.users.has(userId)) {
      this.users.delete(userId);
    }
  }

  get userList() {
    return Array.from(this.users);
  }
}

export default new UserStore();
