const mongoose = require("mongoose");
require("dotenv").config();

async function checkDb() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database:", conn.connection.name);
        console.log("Collections:", Object.keys(conn.connection.collections));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDb();
