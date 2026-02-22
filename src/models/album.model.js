const mongoose = require("mongoose")


const albumschema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",

    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const albumModel = mongoose.model("ALBUM", albumschema)

module.exports = albumModel;