const express = require('express');
const router = express.Router();
const {logout} = require('../controlar/authentication.controlar');
/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Log out user
 *     description: Log out an authenticated user by invalidating their session.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           format: Basic <token>
 *     responses:
 *       '200':
 *         description: User successfully logged out.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error.
 */
router.post('/logout',async(req,res,next)=>{
    logout(req.header('Authorization'),req.authdata).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        next(err);
    })
})


module.exports = router;