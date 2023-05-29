const db = require("../models");
const Class = db.classes;
const Section = db.section
const Student = db.Student
const { statusCodes } = require("../response/httpStatusCodes");
const { messages, customMessages } = require("../response/customMesages");


const createClassService = async (params = {}) => {
  try {
    const Classes = {
      create: async function (data) {
        new Class(params)
      }
    };
    const newClass = await Classes.create({
      name: params.name, 
    });
    return {
      status: true,
      data: newClass,
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



  const mapSectionToClassService = async (req,res) => {
    try {
      const { classId, sectionId } = req.body;
  
      const targetClass = await Class.findByPk(classId);
      const targetSection = await Section.findByPk(sectionId);
  
      if (!targetClass || !targetSection) {
        return {
            status:false,
            message:messages.dataNotFound,
            statusCodes:statusCodes.HTTP_NOT_FOUND
        }
      }
      targetClass.SectionId = targetSection.id; 
       await targetClass.save();
  
      return {
        status:true,
        message:messages.success,
        data: {
          classId: targetClass.id,
          sectionId: targetSection.id,
        },
        statusCode:statusCodes.HTTP_OK
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

  const mapStudentToClassSectionService = async (req,res)=>{
    try {
      const { studentId, classId, sectionId } = req.body;
      const targetStudent = await Student.findByPk(studentId);
      const targetClass = await Class.findByPk(classId);
      const targetSection = await Section.findByPk(sectionId);
  
      if (!targetStudent||!targetClass||!targetSection) {
        return {
            statusCodes:statusCodes.HTTP_NOT_FOUND,
            status:false,
            message:messages.dataNotFound
        }
      }
      targetStudent.ClassId = targetClass.id; 
      targetStudent.SectionId = targetSection.id; 
  
      await targetStudent.save();
  
      return{
        status:true,
        statusCodes:statusCodes.HTTP_OK,
        data: {
          studentId: targetStudent.id,
          classId: targetClass.id,
          sectionId: targetSection.id,
        },
        message:messages.success
    }
    } catch (error) {
    return {
        status: false,
        statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: error.message,
        data: [],
      };  
  }
}

module.exports= { 
     createClassService,mapStudentToClassSectionService,mapSectionToClassService
}