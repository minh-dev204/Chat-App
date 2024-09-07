const express = require("express")
const { createMessage, getMessages, upload } = require("../Controllers/messageController")

const router = express.Router();

// sử dụng middleware upload.single() để xử lý một file upload
router.post("/", upload.single("image"),createMessage);
router.get("/:chatId", getMessages);

module.exports = router;