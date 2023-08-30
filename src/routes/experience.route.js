const express = require("express");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const experienceController = require("../controllers/experience.controller");

const router = express.Router();

router
  .route("/")
  .get(auth, experienceController.getAllExperience)
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
 *   name: Experience
 *   description: Experience management and retrieval
 */

/**
 * @swagger
 * /api/experience:
 *   get:
 *     summary: Get all Experiences
 *     description: Only admin can retrieve all Experience
 *     security:
 *       - bearerAuth: []
 *     responses:
 *
 */
