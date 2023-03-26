import { EntityNotFoundError, EntityOperationError, InvalidParameterError, UtilityOperationError } from "../core/customErrors";
import { UserUtil } from "../core/userUtil";
import { DataRepository } from "../data/dataRepository";
import { UserEntity } from "../data/entities/userEntity";
import { User } from "../model/user";

jest.mock("../data/dataRepository");

const mockDataRepository: jest.Mocked<DataRepository> =
  new DataRepository() as any;
const user: User = {
  id: 1,
  firstName: "John",
  middleName: "",
  lastName: "Doe",
  userName: "jdoe",
  password: "1234",
  isActive: true,
};
let users: User[] = [user];
let userEntity: UserEntity = new UserEntity({
  id: user.id,
  firstName: user.firstName,
  middleName: user.middleName,
  lastName: user.lastName,
  userName: user.userName,
  password: user.password,
  isActive: user.isActive
});
const userUtil = new UserUtil(mockDataRepository);

describe("UserUtilTests => addUser", () => {
  test("addUser should return user", async () => {
    mockDataRepository.addUser.mockImplementation(() =>Promise.resolve(userEntity));
    let result: User | null = await userUtil.addUser(user);
    expect(result).not.toBeNull();
    expect(result).toEqual(user);
  });
  test("addUser should throw error when parameter is empty", () => {
    let nullUser: User;
    expect(async () => {
      await userUtil.addUser(nullUser);
    })
    .rejects
    .toThrow(InvalidParameterError);
  });
  test("addUser should throw error when user exists", () => {
    mockDataRepository.addUser.mockImplementation(() => { throw new EntityOperationError() });
    let nullUser: User;
    expect(async () => {
      await userUtil.addUser(nullUser);
    })
    .rejects
    .toThrow(InvalidParameterError);
  }); 
});

describe("UserUtilTests => changePassword", () => {
  test("changePassword should return true", async () => {
    mockDataRepository.changePassword.mockImplementation(() => Promise.resolve(true));
    let result: boolean = await userUtil.changePassword(user.id, "1234", "4321");
    expect(result).toBeTruthy();
  });
  test("changePassword should throw error when old password is empty", () => {
    expect(async () => {
      await userUtil.changePassword(user.id, "", "4321");
    })
    .rejects
    .toThrow(InvalidParameterError);
  });
  test("changePassword should throw error when new password is empty", () => {
    expect(async () => {
      await userUtil.changePassword(user.id, "1234", "");
    })
    .rejects
    .toThrow(InvalidParameterError);
  });
  test("changePassword should throw error when user does not exist", () => {
    mockDataRepository.changePassword.mockImplementation(() => { throw new EntityNotFoundError() });
    expect(async () => {
      await userUtil.changePassword(user.id, "1234", "4321");
    })
    .rejects
    .toThrow(UtilityOperationError);
  });
});

describe("UserUtilTests => changeUserState", () => {
  test("changeUserState should return true", async () => {
    mockDataRepository.changeUserState.mockImplementation(() => Promise.resolve(true));
    let result: boolean = await userUtil.changeUserState(user.id);
    expect(result).toBeTruthy();
  });
  test("changeUserState should return false when id is not found", async () => {
    mockDataRepository.changeUserState.mockImplementation(() => Promise.resolve(false));
    let result: boolean = await userUtil.changeUserState(0);
    expect(result).toBeFalsy();
  });
});

describe("UserUtilTests => getUser", () => {
  test("getUser should return user", async () => {
    mockDataRepository.getUser.mockImplementation(() => Promise.resolve(userEntity));
    let result: User | null = await userUtil.getUser(1);
    expect(result).not.toBeNull();
    expect(result).toEqual(user);
  });
  test("getUser should return null", async () => {
    mockDataRepository.getUser.mockImplementation(() => Promise.resolve(null));
    let result: User | null = await userUtil.getUser(1);
    expect(result).toBeNull();
  });
});

describe("UserUtilTests => login", () => {
  test("login should return true", async () => {
    mockDataRepository.login.mockImplementation(() => Promise.resolve(true));
    let result: boolean = await userUtil.login(user.userName, user.password);
    expect(result).toBeTruthy();
  });
  test("login should throw error when userName is empty", () => {
    expect(async () => {
      await userUtil.login("", user.password);
    })
    .rejects
    .toThrow(InvalidParameterError);
  });
  test("login should throw error when password is empty", () => {
    expect(async () => {
      await userUtil.login(user.userName, "");
    })
    .rejects
    .toThrow(InvalidParameterError);
  });
});

describe("UserUtilTests => getUsers", () => {
  test("getUsers should return users", async () => {
    mockDataRepository.getUsers.mockImplementation(() => Promise.resolve(users));

    let result: User[] | null = await userUtil.getUsers();
    expect(result).not.toBeNull();
    expect(result).not.toHaveLength(0);
  });
  test("getUsers should return empty array", async () => {
    mockDataRepository.getUsers.mockImplementation(() => Promise.resolve([]));

    let result: User[] | null = await userUtil.getUsers();
    expect(result).toHaveLength(0);
  });
  test("getUsers should return null", async () => {
    mockDataRepository.getUsers.mockImplementation(() => Promise.resolve(null));
    let result: User[] | null = await userUtil.getUsers();
    expect(result).toBeNull();
  });
});

describe("UserUtilTests => updateUser", () => {
  test("updateUser should return true", async () => {
    mockDataRepository.updateUser.mockImplementation(() => Promise.resolve(true));
    let result: boolean = await userUtil.updateUser(user);
    expect(result).toBeTruthy();
  });
  test("updateUser should throw error when parameter is empty", () => {
    let nullUser: User;
    expect(async () => {
      await userUtil.updateUser(nullUser);
    })
    .rejects
    .toThrow(InvalidParameterError);
  });
});
