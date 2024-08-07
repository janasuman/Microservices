const { body } = require('express-validator');
const CreateTask = [
    body('Task').trim().notEmpty().withMessage('Tasks is required'),
    body('ProjectID').isNumeric().notEmpty().withMessage('ProjectID is required'),
];

const readTask = [
    body('ProjectID').isNumeric().notEmpty().withMessage('ProjectID is required'),
];

const DeleteTask = [
    body('TaskID').isNumeric().notEmpty().withMessage('TaskID is required')
];

module.exports = {
    CreateTask,
    readTask,
    DeleteTask
}