/**
 * Tests Foo class
 *
 * @group unit/classes/UserController
 */

import { UserController } from '../user.controller';
import { Request } from 'express';
import UserService from '../user.service';
import userRepo from '../user.repo.db';
import { mockRequest, mockResponse } from '../../../utils/mockInterseptor';
import { TUserResponse } from 'types/user';
import { LoggingResponse } from 'types/server';

const service = new UserService(userRepo);
const controller = new UserController(service);

describe('get one user', () => {
  it('should get one user by id and return response correctly', async () => {
    //Arrange
    const mReq = mockRequest({ params: { id: '$$' } });
    const mRes = mockResponse();
    const expectedUser: TUserResponse = {
      id: '667fbb60-0215-4079-84d7-41116632e9ca',
      login: 'nagibator666',
      age: 16,
      groups: [],
    };
    jest.spyOn(service, 'getUserById').mockResolvedValue(expectedUser);
    //Act
    await controller.getOneUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.getUserById).toBeCalled();
    expect(mRes.status).toBeCalledTimes(0); //will return status 200;
    expect(mRes.json).toBeCalledWith(expectedUser);
  });
  it('should return in response error when user not found', async () => {
    //Arrange
    const mReq = mockRequest({ params: { id: '$$' } });
    const mRes = mockResponse();
    jest.spyOn(service, 'getUserById').mockResolvedValue(null);
    //Act
    await controller.getOneUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.getUserById).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith('user $$ not found');
  });
});

describe('get users list', () => {
  it('should get users list and return response correctly', async () => {
    //Arrange
    const mReq = mockRequest({ query: { loginSubstring: '$$', limit: '1' } });
    const mRes = mockResponse();
    const expectedUsers: TUserResponse[] = [
      {
        id: '667fbb60-0215-4079-84d7-41116632e9ca',
        login: 'nagibator666',
        age: 16,
        groups: [],
      },
    ];
    jest.spyOn(service, 'getUsersList').mockResolvedValue(expectedUsers);
    //Act
    await controller.getUsers(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.getUsersList).toBeCalled();
    expect(mRes.json).toBeCalledWith(expectedUsers);
  });
});

describe('delete user', () => {
  it('should return message and response correctly', async () => {
    //Arrange
    const id = '$$';
    const mReq = mockRequest({ params: { id } });
    const mRes = mockResponse();
    jest.spyOn(service, 'deleteUser').mockResolvedValue(true);
    //Act
    await controller.deleteUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.deleteUser).toBeCalled();
    expect(mRes.status).toBeCalledTimes(0); //will return status 200
    expect(mRes.send).toBeCalledWith(`User ${id} was deleted`);
  });
  it('should return in response error when user not found', async () => {
    //Arrange
    const id = 'XX';
    const mReq = mockRequest({ params: { id } });
    const mRes = mockResponse();
    jest.spyOn(service, 'deleteUser').mockResolvedValue(null);
    //Act
    await controller.deleteUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.deleteUser).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith(`user ${id} not found`);
  });
});

describe('add user', () => {
  it('should return user and response correctly', async () => {
    //Arrange
    const user = {
      login: 'testuser',
      password: 'aaaaa3',
      age: 32,
    };
    const expectedUser: TUserResponse = {
      id: '1',
      login: user.login,
      age: user.age,
      groups: [],
    };
    const mReq = mockRequest({ body: user });
    const mRes = mockResponse();
    jest.spyOn(service, 'createUser').mockResolvedValue(expectedUser);
    //Act
    await controller.addUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.createUser).toBeCalled();
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(expectedUser);
  });
});

describe('update user', () => {
  it('should return message and response correctly', async () => {
    //Arrange
    const user = {
      login: 'testuser',
      password: 'aaaaa3',
      age: 32,
    };
    const expectedUser: TUserResponse = {
      id: '1',
      login: user.login,
      age: user.age,
      groups: [],
    };
    const id = '1';
    const mReq = mockRequest({ params: { id }, body: user });
    const mRes = mockResponse();
    jest.spyOn(service, 'updateUser').mockResolvedValue(expectedUser);
    //Act
    await controller.updateUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.updateUser).toBeCalled();
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(expectedUser);
  });
  it('should return in response error when user not found', async () => {
    //Arrange
    const id = 'XX';
    const user = {
      login: 'testuser',
      password: 'aaaaa3',
      age: 32,
    };
    const mReq = mockRequest({ params: { id }, body: user });
    const mRes = mockResponse();
    jest.spyOn(service, 'updateUser').mockResolvedValue(null);
    //Act
    await controller.updateUser(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.updateUser).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith(`user ${id} not found`);
  });
});
