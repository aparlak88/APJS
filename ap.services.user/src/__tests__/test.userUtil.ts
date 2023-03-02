import { UserUtil } from '../core/userUtil';
import { User } from '../model/user';

jest.mock('../data/dataRepository');

const userUtil = new UserUtil();
// const mockDataRepository: jest.Mocked<DataRepository> =
//   new DataRepository() as any;

describe('UserUtilTests', () => {
  test('getUsers should return users', () => {
    let result: User[] | null = userUtil.getUsers();
    expect(result).toHaveLength(1);
  });
});
