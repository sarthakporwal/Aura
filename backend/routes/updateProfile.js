const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer-config');
const User = require('../models/User')
const cloudinary = require('cloudinary');
const configCloudinary = require('../utils/cloudinary-config');

// configuiring the cloudinary
configCloudinary();

// update request for profile
router.post('/update/:email', upload.single('profilePicture'), async (req, res) => {
    try {
        let user = await User.findOne({email: req.params.email}); // finding if user exists
        if(!user) {
            res.status(400).json({message: "No user found, Please register!!"});
        } 
        const newUser = user; // creating new user for updating the dbs
        if(req.body.name) newUser.name = req.body.name;
        if(req.body.regNo) newUser.regNo = req.body.regNo;
        if(req.body.number) newUser.number = req.body.number;
        if(req.body.branch) newUser.branch = req.body.branch;
        if(req.body.year) newUser.year = req.body.year;
        console.log(req.file);
        if(req.file) {
            // uploading to cloudinary
            const uploadResult = await cloudinary.uploader
            .upload(
                req.file.path, {
                    folder: 'webster',
                    public_id: 'websterProfile' + req.file.originalname,
                }
            )
            .catch((error) => {
                console.log(error);
            });
            console.log(uploadResult.secure_url);
            newUser.profilePicture = uploadResult.secure_url
            
            // removing the file created by multer to create disk space
            fs.unlink((req.file.path), (err) => {
                if(err) console.log(err);
                else console.log("Deleted File");
            })
        } 
        user.updateOne({email: req.params.email}, {$set: newUser}, {new: true}); // updating the user
        user.save();
        res.status(201).json(user) // returning the user to client
    } catch (error) {
        console.log(error);
        res.status(501).json({message: "It's not you it's us"});
    }
});
module.exports = router // exporting the router