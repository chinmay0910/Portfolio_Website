const express = require('express');
const multer = require('multer');
const router = express.Router();
const { homeController } = require("../controllers/homeController");
const { AddSkill, ViewSkills } = require('../controllers/Skills');

router.get('/', homeController)

// Multer storage and upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addskill',upload.single('image'), AddSkill)
router.get('/viewSkills', ViewSkills)

module.exports = router;