const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, contactController.getAllContact)
  .post(auth, admin, contactController.createContact);

router
  .route("/:id")
  .put(auth, admin, contactController.updateContactById)
  .get(auth, contactController.getContactById)
  .delete(auth, admin, contactController.deleteContactById);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Contact
 *  description: Contact management and retrieval
 */

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get a Contact
 *     description: Only admin can retrieve all the Contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contact'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create a contact
 *     description: Only admin can create Contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: contact
 *         description: Contact details to create
 *         schema:
 *           type: object
 *           required:
 *             name
 *             email
 *             subject
 *             messag
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             subject:
 *               type: string
 *             message:
 *               type: string
 *           example:
 *             name: fake name
 *             email: fake@example.com
 *             subject: fake subject
 *             message: message about Contact
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contact'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/contact/{id}:
 *   get:
 *     summary: Get a Contact by id
 *     description: Only admin can retrieve the single Contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contact'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   put:
 *     summary: Update a Contact
 *     description: Only admin can update a Contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact id
 *       - in: body
 *         name: contact
 *         required: true
 *         description: Contact details to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             subject:
 *               type: string
 *             message:
 *               type: string
 *           example:
 *             name: fake name
 *             email: fake@example.com
 *             subject: fake subject
 *             message: fake message
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contact'
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
 *     summary: Delete a Contact
 *     description: Only admin can delete a Contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact id
 *     responses:
 *       "200":
 *         description: No Content
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 */
