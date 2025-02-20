// importing the required things and setting up router
const express = require('express');
const router = express.Router();
const Point = require('../models/Point');
const User = require('../models/User');
const titlePlayer = require('../utils/title-calculator');

// get routes for the point
router.get('/:email', async(req, res) => {
    try {
        // finding if user exists or not
        const user = await User.findOne({email: req.params.email});
        if(!user) {
            res.status(201).json({message: "Please register first"});
        }
        // finding the point and if existing then returning it
        const points = await Point.findOne({user_id: user._id});
        res.status(201).json(points); // returning point
    } catch (error) {
        console.log(error);
        res.status(501).json({message: "It's not you it's us"})
    }
});

// post request for the points
router.post('/:email/:type', async(req, res) => {
    try {
        const pointDistribution = { // point distribution for the points
            "easy": 40,
            "medium": 80,
            "hard": 120,
            "attendance": 10
        };
        const user = await User.findOne({email: req.params.email}); // finding if user exists

        if(!user) {
            res.status(201).json({message: "Please register to get started :)"});
        }
        // finding if point exists
        let points = await Point.findOne({user_id: user._id});
        if(!points) {
            // creating new point for storing in dbs
            const newPoint = {
                "user_id": user._id,
                "name": user.name,
                "totalPoints": pointDistribution[req.params.type],
                "category": "",
                "sectional": {}
            }

            const getTitle = titlePlayer(pointDistribution[req.params.type]); // getting the title
            newPoint.category = getTitle;
            const currTimeinmillisecond = new Date().getTime(); // getting time in msec
            newPoint.sectional[currTimeinmillisecond.toString()] = pointDistribution[req.params.type]; // adding the key value pair to new point sectional key
            await new Point(newPoint).save(); // saving the point in dbs
            res.status(201).json({message: "successfully allocated the point!!"}); // returning the message
        } else {
            const getTitle = titlePlayer(pointDistribution[req.params.type] + points.totalPoints); // getting the title
            const currTimeinmillisecond = new Date().getTime(); // getting the time in msec
            const dynamicSectionalKey = `sectional.${currTimeinmillisecond.toString()}`
            await Point.updateOne({user_id: user._id}, {$set: { // updating points total points and sectional field
                totalPoints: points.totalPoints + pointDistribution[req.params.type],
                category: getTitle,
                [dynamicSectionalKey]: pointDistribution[req.params.type]
            }});
            res.status(201).json(points); // returning the point to the client
        }
    } catch (error) {
        console.log(error);
        res.status(501).json("It's not you it's us!!");
    }
});
module.exports = router; // exporting the router