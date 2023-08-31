const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, admin, userController.getAllUser)
  .post(userController.createUser);

router
  .route("/:id")
  .put(userController.updateUserById)
  .get(userController.getUserById)
  .delete(auth, admin, userController.deleteUserById);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management and retrieval
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create a user
 *     description: Everyone can create their account.
 *     tags: [User]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User details to create.
 *         schema:
 *           type: object
 *           required:
 *             - UserName
 *             - email
 *             - password
 *           properties:
 *             userName:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *               description: must be unique
 *             password:
 *               type: string
 *               format: password
 *           example:
 *             userName: fake name
 *             email: fake@example.com
 *             password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/User'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by id.
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   put:
 *     summary: Update a user
 *     description: everyone can update their account
 *     tags: [User]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id
 *         type: string
 *       - in: body
 *         name: user
 *         description: User details to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *           example:
 *             userName: fake name
 *             email: fake@example.com
 *             password: passwod1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/User'
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
 *     summary: Delete a user
 *     description: Only admin can delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */
