const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExistingData"
    },
    id: {
        type: String
    },
    text: {
        type: String
    }
});

module.exports = mongoose.model("DataTemplate", templateSchema);