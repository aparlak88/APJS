import { DataRepositry } from '../data/dataRepository';
import { User } from '../model/user';

const dataRepository = new DataRepositry();

export class UserUtil {
  constructor() {
    let user = {
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
    dataRepository.addUser(user);
    return user;
  }

  getUser(id: number): User | null {
    let userInDb: User | null = dataRepository.getUser(id);
    return userInDb;
  }

  getUsers(): User[] | null {
    return dataRepository.getUsers();
  }

  updateUser(user: User): boolean {
    return this.updateUser(user);
  }

  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): boolean {
    return dataRepository.changePassword(id, oldPassword, newPassword);
  }

  changeUserState(id: number): boolean {
    return dataRepository.changeUserState(id);
  }
}
