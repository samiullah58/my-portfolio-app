const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const aboutController = require("../controllers/about.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, admin, aboutController.getAllAbout)
  .post(auth, admin, aboutController.createAbout);
router
  .route("/:id")
  .put(auth, admin, aboutController.updateAboutById)
  .get(auth, aboutController.getAboutById)
  .delete(auth, admin, aboutController.deleteAboutById);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: About
 *  description: About management and retrieval
 */

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: get all about
 *     description: only admin can retrieve all abouts
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/About'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create an About
 *     description: Only admin can create an About
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: about
 *         description: About details to create
 *         schema:
 *           type: object
 *           required:
 *             introduction
 *             personalInformation
 *             professionalSummary
 *             hobbiesAndInterest
 *           properties:
 *             introduction:
 *               type: string
 *             personalInformation:
 *               type: object
 *             professionalSummary:
 *               type: string
 *             hobbiesAndInterest:
 *               type: string
 *           example:
 *             introduction: fake introduction
 *             personalInformation: {
 *               name: fake name,
 *               location: fake location,
 *               email: fake@example.com }
 *             professionalSummary: fake professional summary
 *             hobbiesAndInterest: fake hobbies and interest
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/About'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/about/{id}:
 *   get:
 *     summary: Get an About by id
 *     description: Only admin can retrieve all the abouts
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: About id
 *     responses:
 *       "200":
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/About'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   put:
 *     summary: Update an About
 *     description: Only admin can update an About
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: About id
 *         type: string
 *       - in: body
 *         name: about
 *         desctiption: About details to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             introduction:
 *               type: string
 *             personalInformation:
 *               type: object
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               email:
 *                 type: string,
 *                 format: email
 *             professionalSummary:
 *               type: string
 *             hobbiesAndInterest:
 *               type: string
 *           example:
 *             introduction: fake introduction
 *             personalInformation: {
 *               name: fake name,
 *               location: fake location,
 *               email: fake@example.com
 *             }
 *             professionalSummary: fake professional summary
 *             hobbiesAndInterest: fake hobbies and interest
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/About'
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
 *     summary: Delete an About
 *     description: Only admin can delete an About
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: About id
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
