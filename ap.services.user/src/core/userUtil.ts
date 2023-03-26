import { DataRepository } from "../data/dataRepository";
import { Sequelizer } from "../data/sequelizer";
import { User } from "../model/user";
import { InvalidParameterError, UtilityOperationError } from "./customErrors";


export class UserUtil {
  private dataRepository: DataRepository;

  constructor(dataRepository: DataRepository) {
    this.dataRepository = dataRepository;
  }

  async addUser(user: User): Promise<User> {
    if (!user) throw new InvalidParameterError();
    try {
      this.dataRepository.addUser(user);
      return user;
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    if (isNaN(id as any) || !oldPassword.length || !newPassword.length)
      throw new InvalidParameterError();
    try {
      return await this.dataRepository
        .changePassword(id, oldPassword, newPassword);
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  async changeUserState(id: number): Promise<boolean> {
    if (isNaN(id as any)) throw new InvalidParameterError();
    try {
      return this.dataRepository.changeUserState(id);
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  async getUser(id: number): Promise<User | null> {
    if (isNaN(id as any)) throw new InvalidParameterError();
    try {
      return await this.dataRepository.getUser(id);
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  async getUsers(): Promise<User[] | null> {
    try {
      let users: User[] | null = [];
      this.dataRepository.getUsers().then((r) => {
        users = r;
      });
      return users;
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  async login(userName: string, password: string): Promise<boolean> {
    if (!userName.length || !password.length) throw new InvalidParameterError();
    try {
      return await this.dataRepository.login(userName, password);
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  testDbConnection(): string {
    let result: string = "";
    let sequelizer = new Sequelizer();
    sequelizer.test().then((r) => {
      result = r;
    });
    return result;
  }

  async updateUser(user: User): Promise<boolean> {
    if (!user) throw new InvalidParameterError();
    try {
      return await this.dataRepository.updateUser(user);
    } catch (error) {
      throw new UtilityOperationError();
    }
  }
}
