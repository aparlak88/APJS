import { User } from '../model/user';

export class DataRepository {
  private users: User[] = [];

  constructor() {
    let user: User = {
      id: 1,
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      userName: 'jdoe',
      password: '1234',
      lastModified: Date.now(),
      isActive: true,
    };

    this.addUser(user);
  }
  
  addUser(user: User): User {
    user.id = this.users[this.users.length - 1]?.id + 1;
    user.lastModified = Date.now();
    this.users.push(user);
    return user;
  }

  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): boolean {
    try {
      let userInDb: User | null = this.users.find((x) => x.id == id, 0) ?? null;
      if (!userInDb) return false;
      if (userInDb.password != oldPassword) return false;

      userInDb.password = newPassword;
      return true;
    } catch {
      return false;
    }
  }

  changeUserState(id: number): boolean {
    try {
      this.users.find((x) => x.id == id, 0)!.isActive = !this.users.find(
        (x) => x.id == id,
        0
      )!.isActive;
      return true;
    } catch {
      return false;
    }
  }

  getUser(id: number): User | null {
    let userInDb: User | null = this.users.find((x) => x.id == id, 0) ?? null;
    return userInDb;
  }

  getUsers(): User[] | null {
    return this.users;
  }

  updateUser(user: User): boolean {
    try {
      this.users.find((x) => x.id == user.id, 0)!.firstName = user.firstName;
      this.users.find((x) => x.id == user.id, 0)!.middleName = user.middleName;
      this.users.find((x) => x.id == user.id, 0)!.lastName = user.lastName;
      this.users.find((x) => x.id == user.id, 0)!.lastModified = Date.now();

      return true;
    } catch {
      return false;
    }
  }
}
