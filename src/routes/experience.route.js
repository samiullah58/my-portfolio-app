const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const experienceController = require("../controllers/experience.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, admin, experienceController.getAllExperience)
  .post(auth, admin, experienceController.createExperience);

router
  .route("/:id")
  .put(auth, admin, experienceController.updateExperienceById)
  .get(auth, experienceController.getExperienceById)
  .delete(auth, admin, experienceController.deleteExperienceById);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Experience
 *  description: Experience management and retrieval
 */

/**
 * @swagger
 * /api/experience:
 *   get:
 *     summary: Get all Experiences
 *     description: Only admin can retrieve all Experience
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Experience'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create an Experience
 *     description: Only admin can create an Experience
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: experience
 *         description: Create an Experience
 *         schema:
 *           type: object
 *           required:
 *             jobTitle
 *             companyName
 *             location
 *             employmentPeriod
 *             description
 *             responsibilities
 *           properties:
 *             jobTitle:
 *               type: string
 *             companyName:
 *               type: string
 *             location:
 *               type: string
 *             employmentPeriod:
 *               startDate:
 *                 type: date
 *               endDate:
 *                 type: date
 *             description:
 *               type: string
 *             responsibilities:
 *               type: array
 *           example:
 *             jobTitle: fake job title
 *             companyName: fake company name
 *             location: fake location
 *             employmentPeriod: {
 *               startDate: 2022-05-01,
 *               endDate: 2023-05-01
 *             }
 *             description: fake description
 *             responsibilities: [api]
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Experience'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/experience/{id}:
 *   get:
 *     summary: Get an Experience bu id
 *     description: Only admin can retrieve an Experience
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Experience id
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Experience'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   put:
 *     summary: Update an Experience
 *     description: Only admin can update an Experienc
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Experience id
 *       - in: body
 *         name: experience
 *         required: true
 *         description: Experience details to update
 *         schema:
 *           type: object
 *           properties:
 *             jobTitle:
 *               type: string
 *             companyName:
 *               type: string
 *             location:
 *               type: string
 *             employmentPeriod:
 *               startDate:
 *                 type: date
 *               endDate:
 *                 type: date
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *           example:
 *             jobTitle: fake job title
 *             companyName: fake company name
 *             location: fake location
 *             employmentPeriod: {
 *               startDate: 2022-05-01,
 *               endDate: 2023-05-01
 *             }
 *             description: fake description
 *             responsibilities: [api]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Experience'
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
 *     summary: Delete an Experience
 *     description: Only admin can delete an Experience
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Experience id
 *     responses:
 *       "200":
 *         description: No Content
 *       "401":
 *         $ref: '#/definitions/unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */
