const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {createStudentService , getAlluserService, updateUserService , deleteStudentService ,studentCsvService} = require("../services/studentService")



const createStudent = async(req,res)=>{
  const params = req.body;
  const result = await createStudentService({...params})
  if (!result.status) {
    return sendErrorResponse(
        req,
        res,
        result.statusCode,
        result.message, []
    );
} else {
    return sendSuccessResponse(
        req,
        res,
        result.statusCode,
        result.message,
        result.data
    );
}
}

const updateStudentById=async (req, res) => {
  const {...params}=req.body;
  const result=await updateUserService(params);
  if(!result.status) {
      return sendErrorResponse(
          req,
          res,
          result.statusCode,
          result.message, []
      );
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

const getAllStudents = async (req, res) => {
  const result = await getAlluserService();
  if (!result.status) {
      return sendErrorResponse(
          req,
          res,
          result.statusCode,
          result.message, []
      );
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

const deleteStudentById = async(req, res) => {
  const id = req.params;
  const result = await deleteStudentService(id);
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

const studentCsv = async(req, res) => {
    const select = []
    const { data: referral } = await studentCsvService(select);
    await csvFile(csvPath, referral, fields);
    res.download(csvPath);
}


module.exports = { 
  createStudent,
  getAllStudents,
  updateStudentById,
  deleteStudentById,
  studentCsv
}