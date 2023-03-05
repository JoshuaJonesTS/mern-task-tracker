const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_DB);
    console.log(`MongoDB Connected: ${conn.connection.host}`.brightBlue.underline.bold);
}

module.exports = connectDB;