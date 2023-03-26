import {
  EntityNotFoundError,
  EntityOperationError,
} from "../core/customErrors";
import { User } from "../model/user";
import { UserEntity, UserEntity as userEntity } from "./entities/userEntity";
import { Op } from "sequelize";

export class DataRepository {
  private users: User[] = [];

  constructor() {
    let user: User = {
      id: 1,
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      userName: "jdoe",
      password: "1234",
      isActive: true,
    };

    // this.addUser(user);
  }

  async addUser(user: User): Promise<UserEntity | null> {
    try {
      let entity = await userEntity.findOne({
        where: {
          userName: user.userName,
        },
      });
      if (entity) throw new EntityOperationError();
      return userEntity.create({
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        userName: user.userName,
        password: user.password,
        isActive: user.isActive,
      });
    } catch {
      throw new EntityOperationError();
    }
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      let entity = await userEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!entity) throw new EntityNotFoundError();
      if (entity.password != oldPassword) return false;

      entity.password = newPassword;
      return true;
    } catch {
      throw new EntityOperationError();
    }
  }

  async changeUserState(id: number): Promise<boolean> {
    try {
      let entity = await userEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!entity) throw new EntityNotFoundError();
      entity.isActive = !entity.isActive;
      return true;
    } catch {
      throw new EntityOperationError();
    }
  }

  async getUser(id: number): Promise<User | null> {
    return await userEntity.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUsers(): Promise<User[] | null> {
    return await userEntity.findAll();
  }

  async login(userName: string, password: string): Promise<boolean> {
    if (
      await userEntity.findOne({
        where: {
          [Op.and]: [{ userName: userName }, { password: password }],
        },
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  async updateUser(user: User): Promise<boolean> {
    try {
      let entity = await userEntity.findOne({
        where: {
          id: user.id,
        },
      });
      if (!entity) throw new EntityNotFoundError();
      await userEntity.update(
        {
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      return true;
    } catch {
      throw new EntityOperationError();
    }
  }
}
