const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  createClassService,mapSectionToClassService,mapStudentToClassSectionService
} = require("../services/classService");

const createClass = async (req, res) => {
  const params = req.body;
  const result = await createClassService({ ...params });
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

const mapSectionToClass = async (req, res) => {
  const params = req.body;
  const result = await mapSectionToClassService({ ...params });
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

const mapSectionToClassSection = async (req, res) => {
  const params = req.body;
  const result = await mapStudentToClassSectionService({ ...params });
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

module.exports = {
   createClass , mapSectionToClass , mapSectionToClassSection
}