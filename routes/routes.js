const express = require('express');
const multer = require('multer');
const router = express.Router();
const { homeController } = require("../controllers/homeController");
const { signinPage, createUser, login, getUser } = require("../controllers/signin");
const { AddSkill, AddProject, ViewSkills, ViewProjects, ViewAllProjects } = require('../controllers/Skills');
const fetchuser = require('../middleware/fetchuser');

router.get('/', homeController)

// Multer storage and upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addskill',upload.single('image'), AddSkill)
router.post('/addproject',upload.single('image'), AddProject)
router.get('/viewSkills', ViewSkills)
router.get('/Viewprojects', ViewProjects)
router.get('/Viewallprojects', ViewAllProjects)
router.get('/signin', signinPage)
router.post('/createuser', createUser)
router.post('/login', login)
router.get('/getuser', fetchuser, getUser)

module.exports = router;