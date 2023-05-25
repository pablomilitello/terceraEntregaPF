import { userModel } from './models/users.model.js';

class UsersManager {
  async createUser(user) {
    const { email, password } = user;
    try {
      const existUser = await userModel.find({ email, password });
      if (existUser.length === 0) {
        const newUser = await userModel.create(user);
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async loginUser(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
  }

  async findUserById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id, obj) {
    try {
      const updateUser = await userModel.updateOne({ _id: id }, { $set: obj });
      return updateUser;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id) {
    try {
      const deleteUser = await userModel.deleteOne(id);
      return deleteUser;
    } catch (error) {
      return error;
    }
  }
}

export default UsersManager;
