const { statusCodes } = require("../response/httpStatusCodes");
const { messages, customMessages } = require("../response/customMesages");
const db = require("../models");
const Staff = db.Staff;

const createStaffService = async (params = {}) => {
  try {
    const Staff = await Staff(params);
    const newstudent = await Staff.create({
        name,
        dob,
        phoneNumber,
        designation,
        qualification,
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

const getAllStaffService = async () => {
  try {
    const staffs = await Staff.findAll();
    return {
      status: true,
      data: staffs,
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

const updateStaffService = async () => {
  try {
    const { id } = req.params;
    const {
        name,
        dob,
        phoneNumber,
        designation,
        qualification,
        address,
        city,
        state,
        pincode,
    } = req.body;
    const [updatedRows] = await Staff.update(
      {
        name,
        dob,
        phoneNumber,
        designation,
        qualification,
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

const deleteStaffService = async (params) => {
  try {
    const { id } = {...params};
    const deletedRows = await Staff.destroy({
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

const staffCsvService = async(req, res) => {
    try {
        const referalList = await Staff.findAll()
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
  createStaffService,
  getAllStaffService,
  updateStaffService,
  deleteStaffService,
  staffCsvService
};
