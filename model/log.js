const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const logSchema = new Schema({
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true},
    description: String,
    duration: Number,
    date: {type: Date, default: () => Date.now()}
})

const log = model("log",logSchema);

module.exports = {log};
