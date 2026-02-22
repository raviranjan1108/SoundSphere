const mongoose = require("mongoose")

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("Database connect successfully")

    } catch (err) {
        console.log("Database connected error", err)

    }


}

module.exports = connectDB