import { DataRepository } from '../data/dataRepository';
import { User } from '../model/user';
import { InvalidParameterError } from './customErrors';

const dataRepository = new DataRepository();

export class UserUtil {
  private dataRepository: DataRepository;

  constructor(dataRepository: DataRepository) {
    this.dataRepository = dataRepository;
  }

  addUser(user: User): User {
    if(!user) throw new InvalidParameterError();
    try {
      dataRepository.addUser(user);
      return user;
    } catch (error) {
      throw new Error('Unable to update user');
    }
  }

  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): boolean {
    if(isNaN(id as any) || (!oldPassword.length || !newPassword.length)) throw new InvalidParameterError();
    try {
      return this.dataRepository.changePassword(id, oldPassword, newPassword);
    } catch (error) {
      throw new Error('Unable to change password');
    }
  }

  changeUserState(id: number): boolean {
    if(isNaN(id as any)) throw new InvalidParameterError();
    try {
      return this.dataRepository.changeUserState(id);
    } catch (error) {
      throw new Error('Unable to change user state');
    }
  }

  getUser(id: number): User | null {
    if(isNaN(id as any)) throw new InvalidParameterError();
    try {
      let userInDb: User | null = this.dataRepository.getUser(id);
      return userInDb;
    } catch (error) {
      throw new Error('Unable to get user');
    }
  }

  getUsers(): User[] | null {
    try {
      return this.dataRepository.getUsers();
    } catch (error) {
      throw new Error('Unable to get users');
    }
  }

  login(userName: string, password: string): boolean {
    if(!userName.length || !password.length) throw new InvalidParameterError();
    try {
      return this.dataRepository.login(userName, password);
    } catch (error) {
      throw new Error('Unable to login');
    }
  }

  updateUser(user: User): boolean {
    if(!user) throw new InvalidParameterError();
    try {
      return this.dataRepository.updateUser(user);
    } catch (error) {
      throw new Error('Unable to update user');
    }
  }
}
