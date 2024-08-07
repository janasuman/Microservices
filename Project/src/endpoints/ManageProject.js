const express = require('express');
const router = express.Router();
const {ValidRequest} = require('@sumanauth/common');
const valid = require('../validation/ManageProject.dt');
const projectControlar = require('../controlar/ManageProject.controlar');
/**
 * @swagger
 * /api/v1/create/project:
 *   post:
 *     summary: Create a new Project
 *     description: Create a new Project with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TITLE:
 *                 type: string
 *                 description: The Title of the Project.
 *               DESCRIPTION:
 *                 type: string
 *                 description: The Description of the Project.
 *               DUE_DATE:
 *                 type: DATE
 *                 description: The Due Date of the Project.
 *             required:
 *               - TITLE
 *               - DESCRIPTION
 *               - DUE_DATE
 *     responses:
 *       '200':
 *         description: Successfully registered a new user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal server error.
 */

router.post('/create',valid.CreateProject,ValidRequest, async(req,res,next)=>{
    projectControlar.SetUpProject(req.body,req.authdata).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        next(err)
    })
});

router.get('/read', async(req,res,next)=>{
    projectControlar.getAllProject(req.authdata).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        next(err)
    })
});

router.delete('/delete',valid.DeleteProject,ValidRequest, async(req,res,next)=>{
    projectControlar.deleteProject(req.body,req.authdata).then(val=>{
        res.status(200).send(val);
    }).catch(err=>{
        next(err)
    })
});

module.exports = router;