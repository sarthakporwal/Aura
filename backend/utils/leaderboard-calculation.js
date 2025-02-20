const Point = require('../models/Point');

const findLeaderboard = (days) => {
    if(days == 0) { // if all time high is asked
        Point.aggregate([ // creating a aggregation pipeline
            {
              $sort: { totalPoints: -1 } // sorting in decreasing order
            }
          ]).exec()
          .then((res) => {
            console.log(res); // returning response of aggregation
            return res
        }).catch((err) => {
            console.log(err); // returning the error
            return err;            
        })
    } else {
        const daysInMiliSecond = days*24*60*60*1000;
        Point.aggregate([ // creating a aggreagation pipeline
            {
                $addFields: { // adding fields inbetweenTimePeriods
                    inbetweenTimePeriod: {
                        $reduce: { // reducing the input
                            input: {
                                $filter: { // filtering the input
                                    input: {
                                        $objectToArray: "$sectional" // sectional key value pair is converted to array from json object
                                    },
                                    as: "item", // alias for input
                                    cond: {
                                        $gte: [
                                            {
                                                $toLong: "$$item.k" // converting item key to long
                                            },
                                            {
                                                $divide: [ // dividing by 1000 to convert to sec
                                                    {
                                                        $subract: [
                                                            {
                                                                $toLong: new Date() // subracting current time in milli second to get given time gap
                                                            },
                                                            daysInMiliSecond // new Date() - daysInMiliSecond
                                                        ]
                                                    },
                                                    1000
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },
                            initialValue: 0, // initializing input to 0
                            in: {$add: ["$$value", "$$this.v"]}
                        }
                    }
                }
            },
            {
                $sort: {inbetweenTimePeriod: -1} // sorting the input in decreasing order
            }
        ]).exec()
        .then((res) => {
            console.log(res); // returning the result
            return res
        }).catch((err) => {
            console.log(err);
            return err;            
        })
    }
};
module.exports = findLeaderboard // exporting the function findLeaderboard