const mongoose = require("mongoose")

// ở đây là nó sẽ tạo luôn 1 cái bảng user vào csdl luôn
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    avatar: String,
    role: String,
},
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;