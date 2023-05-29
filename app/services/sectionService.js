const db = require("../models");
const Section = db.section
const { statusCodes } = require("../response/httpStatusCodes");
const { messages, customMessages } = require("../response/customMesages");


const createSectionService = async (params = {}) => {
    try {
      const Sections = await Section(params);
      const newSection = await Sections.create({
          name,
      });
      return {
        status: true,
        data: newSection,
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

  module.exports= {
     createSectionService
  }