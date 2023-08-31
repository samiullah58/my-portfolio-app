const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const projectController = require("../controllers/project.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, projectController.getAllProject)
  .post(auth, admin, projectController.createProject);

router
  .route("/:id")
  .put(auth, admin, projectController.updateProjectById)
  .get(auth, projectController.getProjectById)
  .delete(auth, admin, projectController.deleteProjectById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management and retrieval
 */

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get a Project
 *     description: Only admin can retrieve a Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Project'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create a Project
 *     description: Only can create a Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: id
 *         description: Project details to create
 *         schema:
 *           type: object
 *           required:
 *             title
 *             description
 *             technologiesUsed
 *             images
 *             projectUrl
 *             gitHubUrl
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             technologiesUsed:
 *               type: array
 *             images:
 *               type: string
 *             projectUrl:
 *               type: string
 *             gitHubUrl:
 *               type: string
 *           example:
 *             title: fake title'
 *             description: fake description
 *             technologiesUsed: [fake technologiesUsed]
 *             images: fake images
 *             projectUrl: fake projectUrl
 *             gitHubUrl: fake gitHubUrl
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Project'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: get a single Project
 *     description: Only admin can retrieve
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Project'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   put:
 *     summary: Update a Project
 *     description: Only admin can update a Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project id
 *       - in: body
 *         name: project
 *         require: true
 *         descriptions: Project details to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             technologiesUsed:
 *               type: array
 *             images:
 *               type: string
 *             projectUrl:
 *               type: string
 *             gitHubUrl:
 *               type: string
 *           example:
 *             title: fake title'
 *             description: fake description
 *             technologiesUsed: [fake technologiesUsed]
 *             images: fake images
 *             projectUrl: fake projectUrl
 *             gitHubUrl: fake gitHubUrl
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Project'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   delete:
 *     summary: Delete a Project
 *     description: Only admin can delete a Project
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project id
 *     responses:
 *       "200":
 *         description: No Content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Project'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */
