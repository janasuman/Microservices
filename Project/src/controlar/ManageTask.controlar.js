const { CustomError, BadRequestError } = require("@sumanauth/common");
const task = require("../models/task");

const SetUpTask = async (data,authdata) => {
    try {
        const existingTask = await task.findOne({
            where:{
                Title:data.Task,
            }
        });
    
        if (existingTask) throw new BadRequestError('Tasks already exist')
        const req = {
            ProjectID: data.ProjectID,
            Title: data.Task,
            Task_Desc: data.Task_Desc || null,
            Start_Date: data.Start_Date || null,
            End_Date: data.End_Date || null,
            Created_By: authdata.UserID ,
            Status: data.Status || "To Do"
        };

        return await task.create(req);
    } catch (err) {
        if (err instanceof CustomError) throw err;
        throw new CustomError(err.message);
    }
};

const getAllTaskByProject = async (data,authdata) => {
    try {
        return await task.findAll({
            attributes:["TaskID","Title"],
            where:{
                ProjectID: data.ProjectID,
                IsActive: true
            }
        })
    } catch (err) {
        if (err instanceof CustomError) throw err;
        throw new CustomError(err.message);
    }
};

const deleteTask = async (data, authdata) => {
    try {
      await task.update(
        { IsActive: false },
        {
          where: {
            TaskID: data.TaskID,
          },
        },
      );
  
      return {
          message: "Task Deleted."
      }
    } catch (err) {
      if(err instanceof CustomError) throw err
          throw new CustomError(err.message) 
    }
  };

module.exports = {
    SetUpTask,
    getAllTaskByProject,
    deleteTask
}