const Skills = require('../models/skills')
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


module.exports = { AddSkill, ViewSkills }