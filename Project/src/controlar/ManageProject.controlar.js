const { CustomError, BadRequestError } = require('@sumanauth/common');
const project = require('../models/project');

const SetUpProject = async (data, authdata) => {
  try {

    const existingProject = await project.findOne({
        where:{
            Title:data.TITLE,
        }
    });

    if (existingProject) throw new BadRequestError('TITLE already exist')
    const req = {
      Title: data.TITLE,
      Project_Desc: data.DESCRIPTION,
      Due_Date: data.DUE_DATE,
      Created_By: authdata.UserID,
    };
    const resp = await project.create(req);

    return { ProjectID: resp.ProjectID };
  } catch (err) {
    if (err instanceof CustomError) throw err;
    throw new CustomError(err.message);
  }
};

const getAllProject = async (authdata) => {
  try {
    return await project.findAll({
      attributes: ['ProjectID', 'Title'],
      where: {
        IsActive: true,
      },
    });
  } catch (err) {
    if (err instanceof CustomError) throw err;
    throw new CustomError(err.message);
  }
};

const deleteProject = async (data, authdata) => {
  try {
    await project.update(
      { IsActive: false },
      {
        where: {
          ProjectID: data.ProjectID,
        },
      },
    );

    return {
        message: "Project Deleted."
    }
  } catch (err) {
    if(err instanceof CustomError) throw err
        throw new CustomError(err.message) 
  }
};

module.exports = {
  SetUpProject,
  getAllProject,
  deleteProject
};
