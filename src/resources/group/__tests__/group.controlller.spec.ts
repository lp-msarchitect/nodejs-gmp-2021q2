import { GroupController } from '../group.controller';
import { Request } from 'express';
import GroupService from '../group.service';
import GroupRepo from '../group.repo.db';
import { mockRequest, mockResponse } from '../../../utils/mockInterseptor';
import { TGroupResponse } from 'types/group';
import { LoggingResponse } from 'types/server';

const service = new GroupService(GroupRepo);
const controller = new GroupController(service);

describe('get one Group', () => {
  it('should get one Group by id and return response correctly', async () => {
    //Arrange
    const mReq = mockRequest({ params: { id: '$$' } });
    const mRes = mockResponse();
    const expectedGroup: TGroupResponse = {
      id: '667fbb60-0215-4079-84d7-41116632e9ca',
      name: 'nagibator666',
      permissions: [],
      users: [],
    };
    jest.spyOn(service, 'getItemById').mockResolvedValue(expectedGroup);
    //Act
    await controller.getOneGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.getItemById).toBeCalled();
    expect(mRes.status).toBeCalledTimes(0); //will return status 200;
    expect(mRes.json).toBeCalledWith(expectedGroup);
  });
  it('should return in response error when Group not found', async () => {
    //Arrange
    const mReq = mockRequest({ params: { id: '$$' } });
    const mRes = mockResponse();
    jest.spyOn(service, 'getItemById').mockResolvedValue(null);
    //Act
    await controller.getOneGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.getItemById).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith('group $$ not found');
  });
});

describe('get Groups list', () => {
  it('should get Groups list and return response correctly', async () => {
    //Arrange
    const mReq = mockRequest({ query: { loginSubstring: '$$', limit: '1' } });
    const mRes = mockResponse();
    const expectedGroups: TGroupResponse[] = [
      {
        id: '667fbb60-0215-4079-84d7-41116632e9ca',
        name: 'nagibator666',
        permissions: [],
        users: [],
      },
    ];
    jest.spyOn(service, 'getAll').mockResolvedValue(expectedGroups);
    //Act
    await controller.getGroups(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.getAll).toBeCalled();
    expect(mRes.json).toBeCalledWith(expectedGroups);
  });
});

describe('delete Group', () => {
  it('should return message and response correctly', async () => {
    //Arrange
    const id = '$$';
    const mReq = mockRequest({ params: { id } });
    const mRes = mockResponse();
    jest.spyOn(service, 'remove').mockResolvedValue(1);
    //Act
    await controller.deleteGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.remove).toBeCalled();
    expect(mRes.status).toBeCalledTimes(0); //will return status 200
    expect(mRes.send).toBeCalledWith(`group ${id} was deleted`);
  });
  it('should return in response error when Group not found', async () => {
    //Arrange
    const id = 'XX';
    const mReq = mockRequest({ params: { id } });
    const mRes = mockResponse();
    jest.spyOn(service, 'remove').mockResolvedValue(0);
    //Act
    await controller.deleteGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.remove).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith(`group ${id} not found`);
  });
});

describe('add Group', () => {
  it('should return Group and response correctly', async () => {
    //Arrange
    const Group = {
      name: 'testGroup',
      permissions: ['READ'],
    };
    const expectedGroup: TGroupResponse = {
      id: '667fbb60-0215-4079-84d7-41116632e9ca',
      name: 'testGroup',
      permissions: ['READ'],
      users: [],
    };
    const mReq = mockRequest({ body: Group });
    const mRes = mockResponse();
    jest.spyOn(service, 'create').mockResolvedValue(expectedGroup);
    //Act
    await controller.addGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.create).toBeCalled();
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(expectedGroup);
  });
});

describe('update Group', () => {
  it('should return message and response correctly', async () => {
    //Arrange
    const Group = {
      name: 'testGroup',
      permissions: ['READ'],
    };
    const expectedGroup: TGroupResponse = {
      id: '667fbb60-0215-4079-84d7-41116632e9ca',
      name: 'testGroup',
      permissions: ['READ'],
      users: [],
    };
    const id = '667fbb60-0215-4079-84d7-41116632e9ca';
    const mReq = mockRequest({ params: { id }, body: Group });
    const mRes = mockResponse();
    jest.spyOn(service, 'update').mockResolvedValue(expectedGroup);
    //Act
    await controller.updateGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.update).toBeCalled();
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(expectedGroup);
  });
  it('should return in response error when Group not found', async () => {
    //Arrange
    const id = 'XX';
    const Group = {
      name: 'testGroup',
      permissions: ['READ'],
    };
    const mReq = mockRequest({ params: { id }, body: Group });
    const mRes = mockResponse();
    jest.spyOn(service, 'update').mockResolvedValue(null);
    //Act
    await controller.updateGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.update).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith(`group ${id} not found`);
  });
});

describe('add users to group', () => {
  it('should return message and response correctly', async () => {
    //Arrange
    const expectedGroup: TGroupResponse = {
      id: '667fbb60-0215-4079-84d7-41116632e9ca',
      name: 'testGroup',
      permissions: ['READ'],
      users: [],
    };
    const groupId = '$$';
    const usersIds = {
      users: ['667fbb60-0215-4079-84d7-41116632e9ca'],
    };
    const mReq = mockRequest({ params: { groupId }, body: usersIds });
    const mRes = mockResponse();
    jest.spyOn(service, 'addUsersToGroup').mockResolvedValue(expectedGroup);
    //Act
    await controller.addUsersToGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.addUsersToGroup).toBeCalled();
    expect(mRes.status).toBeCalledWith(201);
    expect(mRes.json).toBeCalledWith(expectedGroup);
  });
  it('should return in response error when group not found', async () => {
    //Arrange
    const groupId = 'XX';
    const usersIds = {
      users: ['667fbb60-0215-4079-84d7-41116632e9ca'],
    };
    const mReq = mockRequest({ params: { id: groupId }, body: usersIds });
    const mRes = mockResponse();
    jest.spyOn(service, 'addUsersToGroup').mockResolvedValue(null);
    //Act
    await controller.addUsersToGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.addUsersToGroup).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith(`group ${groupId} not found`);
  });
  it('should return in response error when user not found', async () => {
    //Arrange
    const groupId = '667fbb60-0215-4079-84d7-41116632e9ca';
    const usersIds = {
      users: ['XX'],
    };
    const error = new Error(`User with id ${usersIds.users[0]} not found`);
    const mReq = mockRequest({ params: { groupId }, body: usersIds });
    const mRes = mockResponse();
    jest.spyOn(service, 'addUsersToGroup').mockRejectedValue(error);
    //Act
    await controller.addUsersToGroup(mReq as Request, mRes as LoggingResponse);
    //Assert
    expect(service.addUsersToGroup).toBeCalled();
    expect(mRes.status).toBeCalledWith(404);
    expect(mRes.send).toBeCalledWith(error.message);
  });
});
