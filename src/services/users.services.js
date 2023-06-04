import { usersManager } from '../DAL/DAOs/usersDaos/UsersManagerMongo.js';

export const findAllUsers = async () => {
  try {
    const users = await usersManager.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

export const findById = async (id) => {
  try {
    const user = await usersManager.findOneById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const createOneUser = async (obj) => {
  try {
    const newUser = await usersManager.createOne(obj);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const updateOneUser = async (id, obj) => {
  try {
    const user = await usersManager.updateOne(id, obj);
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await usersManager.deleteOne(id);
    return user;
  } catch (error) {
    throw error;
  }
};
