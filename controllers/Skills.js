const Skills = require('../models/skills')
const Projects = require('../models/projects')
const { uploadImageToCloudinary } = require('../utils/imageUpload')

const AddSkill = async (req, res) => {

    if (req.file) {
        const imageUrl = await uploadImageToCloudinary(req.file);
        const newSkill = new Skills({
            SkillName: req.body.SkillName,
            ImgLink: imageUrl

        })
        await newSkill.save()
        res.json({ message: 'Skill added to the database successfully!' });
    }
    else {
        res.status(401).json({ success: false, msg: "Enter valid file" })
    }

}

const AddProject = async (req, res) => {
    if (req.file) {
        const imageUrl = await uploadImageToCloudinary(req.file);
        const newProjects = new Projects({
            projectTitle: req.body.projectTitle,
            projectDescription: req.body.projectDescription,
            projectLink: req.body.projectLink,
            projectCodeLink: req.body.projectCodeLink,
            ImgLink: imageUrl

        })
        await newProjects.save()
        res.json({ message: 'Project added to the database successfully!' });
    }
    else {
        res.status(401).json({ success: false, msg: "Enter valid file" })
    }
}

const ViewSkills = async (req, res) => {

    try {
        const allSkills = await Skills.find({});
        res.json(await allSkills)
        // res.render('index', { skills: allSkills });
    } catch (error) {
        console.error('Error fetching skills:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

const ViewProjects = async (req, res) => {

    try {
        const allProjects = await Projects.find({});
        res.json(await allProjects)
        // res.render('index', { skills: allSkills });
    } catch (error) {
        console.error('Error fetching Projects:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

const ViewAllProjects = async (req, res) => {
    try {
        const allProjects = await Projects.find({});
        res.render('viewprojects.ejs', {projects: allProjects})
        // res.render('index', { skills: allSkills });
    } catch (error) {
        console.error('Error fetching Projects:', error.message);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = { AddSkill, AddProject, ViewSkills, ViewProjects, ViewAllProjects }