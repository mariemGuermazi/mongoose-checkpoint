const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: {type:[String]}
});

module.exports = Person =mongoose.model("Person", personSchema);