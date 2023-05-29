const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  createStaffService,
  getAllStaffService,
  updateStaffService,
  deleteStaffService,
  staffCsvService,
} = require("../services/staffService");

const createStaff = async (req, res) => {
  const params = req.body;
  const result = await createStaffService({ ...params });
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

const updateStaffById = async (req, res) => {
  const { ...params } = req.body;
  const result = await updateStaffService(params);
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

const getAllStaff = async (req, res) => {
  const result = await getAllStaffService();
  if (!result.status) {
    return sendErrorResponse(req, res, result.statusCode, result.message, []);
  } else {
    return sendSuccessResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
};

const deleteStaffById = async (req, res) => {
  const id = req.params;
  const result = await deleteStaffService(id);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result.statusCode,
      result.message,
      result.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result.statusCode,
    result.message,
    result.data
  );
};

const staffCsv = async (req, res) => {
  const select = [];
  const { data: referral } = await staffCsvService(select);
  await csvFile(csvPath, referral, fields);
  res.download(csvPath);
};

module.exports = {
  createStaff,
  getAllStaff,
  updateStaffById,
  deleteStaffById,
  staffCsv,
};
