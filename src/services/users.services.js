import UsersManager from '../DAL/UsersManagerMongo';
import { __dirname } from '../utils.js';

const path = __dirname + '/users.json';

const usersManager = new UsersManager(path);

export const findAllUsers = async () => {
  try {
    const users = await usersManager.findAll();
    return users;
  } catch (error) {
    return error;
  }
};

export const findById = async (id) => {
  try {
    const user = await usersManager.findUserById(id);
    return user;
  } catch (error) {
    return error;
  }
};

export const createOneUser = async (obj) => {
  try {
    const newUser = await usersManager.createUser(obj);
    return newUser;
  } catch (error) {
    return error;
  }
};

export const updateOneUser = async (id, obj) => {
  try {
    const user = await usersManager.updateUser(id, obj);
    return user;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await usersManager.deleteOneUser(id);
    return user;
  } catch (error) {
    return error;
  }
};
