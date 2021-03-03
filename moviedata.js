const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    moviename: {
        type: String,
    },
    artistname: {
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
    description: {
        type: String
    },
    duration: {
        type: String
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
    type: {
        type: String
    },
    premium: {
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
    thumburl: {
        type: String
    },
    contenturl: {
        type: String
    },
    tags: {
        type: String
    },
    viewscount: {
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

module.exports = mongoose.model("MovieData", dataSchema);