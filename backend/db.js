const mongoose = require('mongoose'); //schema file
const mongoURI = "mongodb://127.0.0.1:27017/parth2704"; 

const connectMongo = () => { // connecting the mongoDB
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log("error: " + err);
    });
}
module.exports = connectMongo; // exporting the function
