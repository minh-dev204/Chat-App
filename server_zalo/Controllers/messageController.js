const messageModel = require("../Models/messageModel")
const multer = require("multer")
const path = require("path")


// cấu hình nơi lưu trữ file và tên file
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, "uploads/imgChat/") // Thư mục lưu trữ ảnh trên server
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Tên file unique dựa trên timestamp
    }
});

const upload = multer({ storage: storage });

const createMessage = async (req, res) => {
    try {
        // lấy giá trị
        const { chatId, senderId, text } = req.body;
        const image = req.file ? req.file.filename : null; // Lấy tên file nếu có ảnh
        console.log(chatId, senderId, text, image);

        const message = new messageModel({
            chatId,
            senderId,
            text: text || "", // Nếu không có text, đặt là chuỗi rỗng
            image: image || "",
        })

        const response = await message.save();
        

        // khởi tạo 1 đối tượng
        // const message = new messageModel({
        //     chatId, senderId, text
        // })
        // // lấy đối tượng đó đưa vào csdl
        // const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// lấy các cuộc trò chuyện dựa vào id đoạn chat 
const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createMessage, getMessages, upload }