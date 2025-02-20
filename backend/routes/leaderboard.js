// importing the required things
const express = require('express');
const router = express.Router();
const findLeaderboard = require('../utils/leaderboard-calculation');

// leaderboard routes
router.get('/leaderBoard/:days', async (req, res) => {
    try {
        // getting the leaderboard using the findLeaderBoard function
        const leaderboard = await findLeaderboard(req.params.days);
        res.status(201).send(leaderboard); // responding array leaderboard
    } catch (error) {
        console.log(error);
        res.status(501).json({message: "It's not you it's us"})
    }
});
module.exports = router; // exporting router