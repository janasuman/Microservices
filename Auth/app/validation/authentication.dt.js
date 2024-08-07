const { body } = require('express-validator');
const signupDt = [
    body('Username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    body('Email').trim().isEmail().withMessage('Invalid email address'),
    body('FullName').trim().notEmpty().withMessage('Full name is required')
];

const loginDt = [
    body('Username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required')
]


module.exports={
    signupDt,loginDt
}