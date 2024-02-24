const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;
const connectToDB = async () => {
    try {
        mongoose.connect(URI);

        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to the database: ", error.message);
    }
}

module.exports = connectToDB;