const { statusCodes } = require("../response/httpStatusCodes");
const { messages, customMessages } = require("../response/customMesages");
const db = require("../models");
const Student = db.Student;

const createStudentService = async (params = {}) => {
  try {
    const student = await Student(params);
    const newstudent = await student.create({
      name,
      dob,
      phoneNumber,
      parentName,
      parentPhone,
      address,
      city,
      state,
      pincode,
    });
    return {
      status: true,
      data: newstudent,
      message: messages.success,
      statusCode: statusCodes.HTTP_OK,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const getAlluserService = async () => {
  try {
    const students = await Student.findAll();
    return {
      status: true,
      data: students,
      message: messages.success,
      statusCodes: statusCodes.HTTP_OK,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const updateUserService = async () => {
  try {
    const { id } = req.params;
    const {
      name,
      dob,
      phoneNumber,
      parentName,
      parentPhone,
      address,
      city,
      state,
      pincode,
    } = req.body;
    const [updatedRows] = await Student.update(
      {
        name,
        dob,
        phoneNumber,
        parentName,
        parentPhone,
        address,
        city,
        state,
        pincode,
      },
      {
        where: { id },
      }
    );
    if (updatedRows === 0) {
      return {
        statusCodes: statusCodes.HTTP_NOT_FOUND,
        messages: messages.dataNotFound,
        status: true,
      };
    } else {
      return {
        statusCodes: statusCodes.HTTP_OK,
        messages: messages.success,
        status: true,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const deleteStudentService = async (params) => {
  try {
    const { id } = {...params};
    const deletedRows = await Student.destroy({
      where: { id },
    });
    if (deletedRows === 0) {
      return {
        statusCodes: statusCodes.HTTP_NOT_FOUND,
        messages: messages.dataNotFound,
        status: true,
      };
    } else {
      return {
        statusCodes: statusCodes.HTTP_OK,
        messages: messages.success,
        status: true,
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
      message: error.message,
      data: [],
    };
  }
};

const studentCsvService = async(req, res) => {
    try {
        const referalList = await Student.findAll()
        await csvFile(csvPath, referalList, fields);
        return {
            status: true,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}


module.exports = {
  createStudentService,
  getAlluserService,
  updateUserService,
  deleteStudentService,
  studentCsvService
};
