const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", authController.userLogin);
router.post("/refresh", authController.refreshToke);
router.post("/resetPassword", authController.resetPassword);
router.put("/resetPassword/:token", authController.resetPasswordToken);
router.get("/verify/:token", authController.verifyToken);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Login and Logout
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: User can login with their email and password
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: login
 *         required: true
 *         schema:
 *           type: string
 *           required:
 *             email
 *             password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *           example:
 *             email: fake@example.com
 *             password: password1
 *     responses:
 *       "200":
 *         description: Logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Login'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Get a Access Token
 *     description: Enter refresh token and get a new access token
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: refresh token
 *         required: true
 *         schema:
 *           type: string
 *           required:
 *             refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *           example:
 *             refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU3MmU0ZWZlMDQ0NDhhNWZjOWRiZjciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTM0NjgwMjMsImV4cCI6MTY5MzQ3MTYyM30.oKmz4qsGow8aqJes6wHUbG1zLTiGCLL5FmGGJiuJi0Q"
 *     responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/Refresh'
 *        "403":
 *          $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/auth/resetPassword:
 *   post:
 *     summary: Reset a Paaword
 *     description: Enter your email to get Reset Passwor token
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: reset password
 *         required: true
 *         schema:
 *           type: string
 *           required:
 *             email
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *           example:
 *             email: fake@example.com
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ResetPassword'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/auth/resetPassword/{token}:
 *   put:
 *     summary: Verify Reset Password Token
 *     description: Click the link that is sended to your email to verify your email
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Reset Password Token
 *       - in: body
 *         name: New Password & Confirm New Password
 *         required: true
 *         description: New Password & Confirm New Password to reset your password
 *         schema:
 *           type: object
 *           properties:
 *             newPassword:
 *               type: string
 *               format: password
 *             confirmNewPassword:
 *               type: string
 *               format: password
 *           example:
 *             newPassword: password1
 *             confirmNewPassword: password1
 *     responses:
 *       "200":
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ResetPasswordToken'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify an Email
 *     description: Click on the link in your email to verify your account
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verify Email Token
 *     responses:
 *       "200":
 *         description: Verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Emailverify'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */
