import { makeAutoObservable } from 'mobx';

export interface IUser {
  id: string;
  name: string;
}

class UserStore {
  users: IUser[] = [];
  currentUser: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentUser(currentUser: IUser) {
    this.currentUser = currentUser;
  }

  addUser(user: IUser) {
    this.users.push(user);
  }

  removeUser(userId: string) {
    this.users = this.users.filter(({ id }) => id !== userId);
  }
}

export default new UserStore();
