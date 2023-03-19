import { User } from "../model/user";
import { User as userEntity } from "../data/entities/user";

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

    this.addUser(user);
  }

  addUser(user: User): User {
    let entity = userEntity.create({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      userName: user.userName,
      password: user.password,
      isActive: user.isActive
    });
    user.id = this.users[this.users.length - 1]?.id + 1;
    this.users.push(user);
    return user;
  }

  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      let entity = await userEntity.findOne({
        where: {
          id: id
        }
    })
      if (!entity) return false;
      if (entity.password != oldPassword) return false;

      entity.password = newPassword;
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

  login(userName: string, password: string): boolean {
    if (
      this.users.find(
        (x) => x.userName == userName && x.password == password && x.isActive
      )
    )
      return true;
    return false;
  }

  updateUser(user: User): boolean {
    try {
      this.users.find((x) => x.id == user.id, 0)!.firstName = user.firstName;
      this.users.find((x) => x.id == user.id, 0)!.middleName = user.middleName;
      this.users.find((x) => x.id == user.id, 0)!.lastName = user.lastName;

      return true;
    } catch {
      return false;
    }
  }
}
