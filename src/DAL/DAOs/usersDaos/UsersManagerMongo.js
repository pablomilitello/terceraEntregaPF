import { userModel } from '../../mongoDB/models/users.model.js';
import BasicManager from '../basicDaos/BasicManager.js';
export default class UsersManager extends BasicManager {
  async findByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
  }

  async createOne(user) {
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
}

export const userManager = new UsersManager(userModel);
