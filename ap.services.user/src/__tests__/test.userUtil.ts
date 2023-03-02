import { UserUtil } from "../core/userUtil";
import { DataRepository } from "../data/dataRepository";
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
  lastModified: Date.now(),
  isActive: true,
};
let users: User[] = [user];
const userUtil = new UserUtil(mockDataRepository);

describe("UserUtilTests => getUsers", () => {
  test("getUsers should return users", () => {
    mockDataRepository.getUsers.mockImplementation(() => users);

    let result: User[] | null = userUtil.getUsers();
    expect(result).not.toBeNull();
    expect(result).not.toHaveLength(0);
  });
  test("getUsers should return empty array", () => {
    mockDataRepository.getUsers.mockImplementation(() => []);

    let result: User[] | null = userUtil.getUsers();
    expect(result).toHaveLength(0);
  });
  test("getUsers should return null", () => {
    mockDataRepository.getUsers.mockImplementation(() => null);
    let result: User[] | null = userUtil.getUsers();
    expect(result).toBeNull();
  });
});

describe("UserUtilTests => addUser", () => {
  test("addUser should return user", () => {
    mockDataRepository.addUser.mockImplementation(() => user);
    let result: User | null = userUtil.addUser(user);
    expect(result).not.toBeNull();
    expect(result).toEqual(user);
  });
});

describe("UserUtilTests => updateUser", () => {
  test("updateUser should return user", () => {
    mockDataRepository.updateUser.mockImplementation(() => true);
    let result: boolean = userUtil.updateUser(user);
    expect(result).toBeTruthy();
  });
});

describe("UserUtilTests => getUser", () => {
  test("getUser should return user", () => {
    mockDataRepository.getUser.mockImplementation(() => user);
    let result: User | null = userUtil.getUser(1);
    expect(result).not.toBeNull();
    expect(result).toEqual(user);
  });
  test("getUser should return null", () => {
    mockDataRepository.getUser.mockImplementation(() => null);
    let result: User | null = userUtil.getUser(1);
    expect(result).toBeNull();
  });
});
