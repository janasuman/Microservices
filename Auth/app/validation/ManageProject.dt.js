const { body } = require('express-validator');
const CreateProject = [
    body('TITLE').trim().notEmpty().withMessage('TITLE is required'),
    body('DESCRIPTION').trim().notEmpty().withMessage('DESCRIPTION is required'),
    body('DUE_DATE').trim().isDate().withMessage('Invalid DUE DATE')
];

const DeleteProject = [
    body('ProjectID').isNumeric().notEmpty().withMessage('ProjectID is required'),
];

module.exports = {
    CreateProject,
    DeleteProject
}