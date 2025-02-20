const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/priyanshi";

const connectMongo = () => { // connecting the mongoDB
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('mongoDB connected');
    })
    .catch((err) => {
        console.log("error: " + err);
    });
}
module.exports = connectMongo; // exporting the function