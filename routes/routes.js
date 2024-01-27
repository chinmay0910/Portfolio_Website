const express = require('express');
const multer = require('multer');
const router = express.Router();
const { homeController } = require("../controllers/homeController");
const { AddSkill, AddProject, ViewSkills, ViewProjects, ViewAllProjects } = require('../controllers/Skills');

router.get('/', homeController)

// Multer storage and upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addskill',upload.single('image'), AddSkill)
router.post('/addproject',upload.single('image'), AddProject)
router.get('/viewSkills', ViewSkills)
router.get('/Viewprojects', ViewProjects)
router.get('/Viewallprojects', ViewAllProjects)

module.exports = router;