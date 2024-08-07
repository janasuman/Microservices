const express = require('express');
const router = express.Router();
const {signup,login} = require('../controlar/authentication.controlar');
const {ValidRequest} = require('@sumanauth/common');
const valid = require('../validation/authentication.dt');
/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 description: The username of the user.
 *               Email:
 *                 type: string
 *                 description: The email address of the user.
 *               FullName:
 *                 type: string
 *                 description: The FullName of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - Username
 *               - Email
 *               - FullName
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully registered a new user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error.
 */

router.post('/signup',valid.signupDt,ValidRequest, async(req,res,next)=>{
    signup(req.body).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        next(err);
    })
})
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in user
 *     description: Authenticate a user with their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - Username
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                   description: JSON Web Token (JWT) for authenticated user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized. Invalid password.
 *       '500':
 *         description: Internal server error.
 */

router.post('/login',valid.loginDt,ValidRequest,async(req,res,next)=>{
    login(req.body).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        next(err);
    })
});

module.exports = router;
