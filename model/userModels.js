var mongoose = require("../config/dbConnect");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user",
    },
},{
    collection: "user"
})


var UserModel = mongoose.model("user", userSchema);
module.exports = UserModel