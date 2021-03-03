const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({

    albumname: {
        type: String,
    },
    singername: {
        type: String,
    },
    director: {
        type: String,
    },
    producer: {
        type: String
    },
    musiccompany: {
        type: String
    },
    musicdirector: {
        type: String
    },
    lyricwriter: {
        type: String
    },
    releasedate: {
        type: Date,
        default: Date.now
    },
    livedate: {
        type: Date,
        default: Date.now
    },
    rightsdate: {
        type: Date,
        default: Date.now
    },
    rightsenddate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    duration: {
        type: String
    },
    upc: {
        type: Number
    },
    isrccode: {
        type: Number
    },
    language: {
        type: String
    },
    genre: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    mood: {
        type: String
    },
    version: {
        type: String
    },
    type: {
        type: String
    },
    premium: {
        type: String
    },
    thumburl: {
        type: String
    },
    contenturl: {
        type: String
    },
    tags: {
        type: String
    },
    playcount: {
        type: Number
    },
    likescount: {
        type: Number
    },
    downloadscount: {
        type: Number
    },
    sharecount: {
        type: Number
    }
});

module.exports = mongoose.model("SongData", dataSchema);