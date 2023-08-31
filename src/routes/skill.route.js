const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const skillController = require("../controllers/skill.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, admin, skillController.getAllSkill)
  .post(auth, admin, skillController.createSkill);

router
  .route("/:id")
  .put(auth, admin, skillController.updateSkillById)
  .get(auth, skillController.getSkillById)
  .delete(auth, admin, skillController.deleteSkillById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Skill
 *   description: Skill management and retrieval
 */

/**
 * @swagger
 * /api/skill:
 *   get:
 *     summary: Get a Skill
 *     description: Only admin can retrive all the Skill
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Skill'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *
 *   post:
 *     summary: Create a Skill
 *     description: Only admin can create a Skill
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: skill
 *         description: Skill details to create
 *         schema:
 *           type: object
 *           required:
 *             skillName
 *             category
 *             description
 *             experienceLevel
 *           properties:
 *             skillName:
 *               type: string
 *             category:
 *               type: array
 *             description:
 *               type: string
 *             experienceLevel:
 *               type: string
 *           example:
 *             skillName: fake skill name
 *             category: [fake category]
 *             description: fake description
 *             experienceLevel: fake experience level
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Skill'
 *       "400":
 *         $ref: '#/definitions/DuplicateEmail'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 */

/**
 * @swagger
 * /api/skill/{id}:
 *   get:
 *     summary: Get a single Skill
 *     description: Only admin can retrieve a Skill
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Skill id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Skill'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 *
 *   put:
 *     summary: Update a Skill
 *     description: Only admin can Update a Skill
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Skill id
 *       - in: body
 *         name: skill
 *         required: true
 *         description: Skill details to update
 *         schema:
 *           type: object
 *           properties:
 *             properties:
 *             skillName:
 *               type: string
 *             category:
 *               type: array
 *             description:
 *               type: string
 *             experienceLevel:
 *               type: string
 *           example:
 *             skillName: fake skill name
 *             category: [fake category]
 *             description: fake description
 *             experienceLevel: fake experience level
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Skill'
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
 *     summary: Delete a Skill
 *     description: Only admin can delete a Skill
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Skill id
 *     responses:
 *       "200":
 *         descriptions: No Content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Skill'
 *       "401":
 *         $ref: '#/definitions/Unauthorized'
 *       "403":
 *         $ref: '#/definitions/Forbidden'
 *       "404":
 *         $ref: '#/definitions/NotFound'
 */
