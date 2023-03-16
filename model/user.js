const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema ({
    username: String
})

const user = model('user',userSchema);

module.exports = {user};