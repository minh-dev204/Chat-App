const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");


const app = express();
require("dotenv").config()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

// Cung cấp các tệp tĩnh từ thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", userRoute)
app.use("/chats", chatRoute)
app.use("/messages", messageRoute)

app.get("/", (req, res) => {
    res.send("welcom your zalo chat")
})

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;


app.listen(port, (req, res) => {
    console.log(`Server running on port. ${port}`);
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("MongoDB connection astablished")
})