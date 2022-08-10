const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { encodeData, decodeData } = require("../helpers/jwt");

class UserController {
  static async userRegister(request, response, next) {
    const { username, email, password, role } = request.body;

    try {
      const newUser = await User.create({ username, email, password, role });
      response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async userLogin(request, response, next) {}
  static async getAllUser(request, response, next) {
    try {
      const user = await User.findAll();
      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async getUserById(request, response, next) {
    let { id } = request.params;

    try {
      const userById = await User.findByPk(id);
      if (!userById) {
        throw { name: "NotFound" };
      } else {
        response.status(200).json(userById);
      }
    } catch (error) {
      next(error);
    }
  }
  static async updateUserData(request, response, next) {
    let { id } = request.params;
    let { username, email, password, role } = request.body;
    try {
      const newUser = await User.update({ username, email, password, role }, { where: { id }, individualHooks: true, returning: true });
      if (newUser[0] === 0) {
        throw { name: "NotFound" };
      } else {
        response.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(request, response, next) {
    let { id } = request.params;
    try {
      const deleteUser = await User.destroy({ where: { id }, return: true });
      if (!deleteUser) {
        throw { name: "NotFound" };
      } else {
        response.status(200).json(`succes delete uder id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
