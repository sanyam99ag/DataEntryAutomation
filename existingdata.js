const mongoose = require("mongoose");


const dataSchema = new mongoose.Schema({

    artistname: [],
    director: [],
    producer: [],
    musiccompany: [],
    musicdirector: [],
    lyricwriter: [],
    language: [],
    genre: [],
    category: [],
    subcategory: [],
    mood: [],
    type: [],
    premium: [],
    tags: []
});

module.exports = new mongoose.model("ExistingData", dataSchema);