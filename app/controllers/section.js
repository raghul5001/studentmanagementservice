const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  createSectionService
} = require("../services/sectionService");

const createSection = async (req, res) => {
  const params = req.body;
  const result = await createSectionService({ ...params });
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
   createSection
}