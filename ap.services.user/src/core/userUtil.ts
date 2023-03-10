import { DataRepository } from '../data/dataRepository';
import { User } from '../model/user';

const dataRepository = new DataRepository();

export class UserUtil {
  private dataRepository: DataRepository;

  constructor(dataRepository: DataRepository) {
    this.dataRepository = dataRepository;
  }

  addUser(user: User): User {
    dataRepository.addUser(user);
    return user;
  }

  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): boolean {
    return this.dataRepository.changePassword(id, oldPassword, newPassword);
  }

  changeUserState(id: number): boolean {
    return this.dataRepository.changeUserState(id);
  }

  getUser(id: number): User | null {
    let userInDb: User | null = this.dataRepository.getUser(id);
    return userInDb;
  }

  getUsers(): User[] | null {
    return this.dataRepository.getUsers();
  }

  updateUser(user: User): boolean {
    return this.dataRepository.updateUser(user);
  }
}