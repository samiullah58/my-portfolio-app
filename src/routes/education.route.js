const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const educationController = require("../controllers/education.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, educationController.getAllEducation)
  .post(auth, admin, educationController.createEducation);

router
  .route("/:id")
  .put(auth, admin, educationController.updateEducationById)
  .get(auth, educationController.getEducationById)
  .delete(auth, admin, educationController.deleteEducationById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Education
 *   description: Education management and retrieval
 */

/**
 * @swagger
 * /api/education:
 *   get:
 *     summary: Get an Education
 *     description: Only admin can retrieve an Education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Education'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create an Education
 *     description: Only admin can create an Education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: education
 *         description: Education details to create
 *         schema:
 *           type: object
 *           required:
 *             institutionName
 *             degree
 *             fieldOfStudy
 *             graduationYear
 *             description
 *           properties:
 *             institutionName:
 *               type: string
 *             degree:
 *               type: string
 *             fieldOfStudy:
 *               type: string
 *             graduationYear:
 *               type: number
 *             description:
 *               type: string
 *           example:
 *             institutionName: fake institution name
 *             degree: fake degree
 *             fieldOfStudy: fake field of study
 *             graduationYear: fake graduation year
 *             description: fake description
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Education'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get a single Education
 *     description: Only admin can retrieve an Education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Education id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Education'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   put:
 *     summary: Update an Education
 *     description: Only admin can update an Education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Education id
 *       - in: body
 *         name: education
 *         required: true
 *         description: Education details to update
 *         schema:
 *           type: object
 *           properties:
 *             institutionName:
 *               type: string
 *             degree:
 *               type: string
 *             fieldOfStudy:
 *               type: string
 *             graduationYear:
 *               type: number
 *             description:
 *               type: string
 *           example:
 *             institutionName: fake institution name
 *             degree: fake degree
 *             fieldOfStudy: fake field of study
 *             graduationYear: fake graduation year
 *             description: fake description
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Education'
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
 *     summary: Delete an Education
 *     description: Only admin can delete an Education
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Education id
 *     responses:
 *       "200":
 *         description: No Content
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */
