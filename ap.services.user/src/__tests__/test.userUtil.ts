import { InvalidParameterError } from '../core/customErrors';
import { UserUtil } from '../core/userUtil';
import { DataRepository } from '../data/dataRepository';
import { User } from '../model/user';

jest.mock('../data/dataRepository');

const mockDataRepository: jest.Mocked<DataRepository> =
  new DataRepository() as any;
const user: User = {
  id: 1,
  firstName: 'John',
  middleName: '',
  lastName: 'Doe',
  userName: 'jdoe',
  password: '1234',
  lastModified: Date.now(),
  isActive: true,
};
let users: User[] = [user];
const userUtil = new UserUtil(mockDataRepository);

describe('UserUtilTests => addUser', () => {
  test('addUser should return user', () => {
    mockDataRepository.addUser.mockImplementation(() => user);
    let result: User | null = userUtil.addUser(user);
    expect(result).not.toBeNull();
    expect(result).toEqual(user);
  });
  test('addUser should throw error when parameter is empty', () => {
    mockDataRepository.addUser.mockImplementation(() => user);
    let nullUser: User;
    expect(() => { userUtil.addUser(nullUser); }).toThrow(InvalidParameterError);
  });
});

describe('UserUtilTests => changePassword', () => {
  test('changePassword should return true', () => {
    mockDataRepository.changePassword.mockImplementation(() => true);
    let result: boolean = userUtil.changePassword(user.id, '1234', '4321');
    expect(result).toBeTruthy();
  });
});

describe('UserUtilTests => changeUserState', () => {
  test('changeUserState should return true', () => {
    mockDataRepository.changeUserState.mockImplementation(() => true);
    let result: boolean = userUtil.changeUserState(user.id);
    expect(result).toBeTruthy();
  });
  test('changeUserState should return false when id is not found', () => {
    mockDataRepository.changeUserState.mockImplementation(() => false);
    let result: boolean = userUtil.changeUserState(0);
    expect(result).toBeFalsy();
  });
});

describe('UserUtilTests => getUser', () => {
  test('getUser should return user', () => {
    mockDataRepository.getUser.mockImplementation(() => user);
    let result: User | null = userUtil.getUser(1);
    expect(result).not.toBeNull();
    expect(result).toEqual(user);
  });
  test('getUser should return null', () => {
    mockDataRepository.getUser.mockImplementation(() => null);
    let result: User | null = userUtil.getUser(1);
    expect(result).toBeNull();
  });
});

describe('UserUtilTests => login', () => {
  test('login should return true', () => {
    mockDataRepository.login.mockImplementation(() => true);
    let result: boolean = userUtil.login(user.userName, user.password);
    expect(result).toBeTruthy();
  });
  test('login should throw error when userName is empty', () => {
    mockDataRepository.login.mockImplementation(() => true);
    expect(() => { userUtil.login('', user.password); }).toThrow(InvalidParameterError);
  });
  test('login should throw error when password is empty', () => {
    mockDataRepository.login.mockImplementation(() => true);
    expect(() => { userUtil.login(user.userName, ''); }).toThrow(InvalidParameterError);
  });
});

describe('UserUtilTests => getUsers', () => {
  test('getUsers should return users', () => {
    mockDataRepository.getUsers.mockImplementation(() => users);

    let result: User[] | null = userUtil.getUsers();
    expect(result).not.toBeNull();
    expect(result).not.toHaveLength(0);
  });
  test('getUsers should return empty array', () => {
    mockDataRepository.getUsers.mockImplementation(() => []);

    let result: User[] | null = userUtil.getUsers();
    expect(result).toHaveLength(0);
  });
  test('getUsers should return null', () => {
    mockDataRepository.getUsers.mockImplementation(() => null);
    let result: User[] | null = userUtil.getUsers();
    expect(result).toBeNull();
  });
});

describe('UserUtilTests => updateUser', () => {
  test('updateUser should return true', () => {
    mockDataRepository.updateUser.mockImplementation(() => true);
    let result: boolean = userUtil.updateUser(user);
    expect(result).toBeTruthy();
  });
});