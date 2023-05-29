const { statusCodes } = require("../response/httpStatusCodes");
const { messages, customMessages } = require("../response/customMesages");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");

const registerUserService = async (params = {}) => {
  try {
    const { email } = params;
    const userExist = await User.findOne({ where: { email: email } });

    if (userExist) {
      return {
        status: true,
        messages: messages.alreadyExist,
        statusCodes: statusCodes.HTTP_ALREADY_REPORTED,
      };
    } else {
      const hashedPass = await bcrypt.hash(params.password, 10);
      const user = await User.create({
        userName: params.userName,
        email: params.email,
        phoneNumber: params.phoneNumber,
        password: hashedPass,
      });

      return {
        status: true,
        messages: messages.created,
        data: user,
        statusCodes: statusCodes.HTTP_OK,
      };
    }
  } catch (error) {
    return {
      status: false,
      messages: error.messages,
      data: [],
    };
  }
};
const loginUserService = async (params) => {
  try {
    const { email, password } = params;
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "yourSecretKey",
          { expiresIn: "10min" }
        );

        return {
          status: true,
          messages: messages.loginSuccessful,
          statusCodes:statusCodes.HTTP_OK,
          data: user,
          token,
        };
      } else {
        return {
          status: false,
          messages: messages.loginFailed,
          statusCodes:statusCodes.HTTP_BAD_REQUEST
        };
      }
    } else {
      return {
        status: false,
        messages: messages.userNotExist,
        statusCodes:statusCodes.HTTP_BAD_REQUEST
      };
    }
  } catch (error) {
    return {
      status: false,
      messages: error.messages,
      data: [],
    };
  }
};

module.exports = { registerUserService, loginUserService };
