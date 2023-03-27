import { DataRepository } from "../data/dataRepository";
import { UserEntity } from "../data/entities/userEntity";
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
      let entity = await this.dataRepository.getUser(id);
      if (entity) {
        let user: User = new User();
        user.id = entity.id;
        user.firstName = entity.firstName;
        user.middleName = entity.middleName;
        user.lastName = entity.lastName;
        user.userName = entity.userName;
        user.password = entity.password;
        user.isActive = entity.isActive;
        return user;
      }
      return null;
    } catch (error) {
      throw new UtilityOperationError();
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      let userEntities: UserEntity[] = await this.dataRepository.getUsers();
      let users: User[] = [];
      userEntities.forEach(itm => {
        let user: User = new User();
        user.id = itm.id;
        user.firstName = itm.firstName;
        user.middleName = itm.middleName;
        user.lastName = itm.lastName;
        user.userName = itm.userName;
        user.password = itm.password;
        user.isActive = itm.isActive;
        users.push(user);
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

  async testDbConnection(): Promise<string> {
    let sequelizer = new Sequelizer();
    return await sequelizer.test();
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
