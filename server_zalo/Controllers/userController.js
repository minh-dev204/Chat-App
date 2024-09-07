const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const multer = require("multer") // tk này liên quan xử lý uploads file
const path = require("path")

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {
    try {
        const { name, phone, password, avatar, role } = req.body;

        // tìm phone
        let user = await userModel.findOne({ phone });

        // nếu phone ok là đã đăng ký rồi thì hiện lỗi ko cho đăng ký
        if (user) return res.status(400).json("SĐT này đã được đăng ký rồi...");

        // nếu thỏa mãn
        user = new userModel({ name, phone, password, avatar, role })

        // đoạn này mã hóa password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();
        // const token = createToken(user._id)
        // res.status(200).json({ _id: user.id, name, email, token });
        res.status(200).json("Đăng ký tài khoản thành công.");

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};


const loginUser = async (req, res) => {
    const { phone, password } = req.body;

    try {
        // tìm phone
        let user = await userModel.findOne({ phone });

        // nếu phone mà user login không có trong csdl thì hiện lỗi
        if (!user) return res.status(400).json("Sai SĐT hoặc mật khẩu...")

        // đoạn này nó sẽ giải mã password trong csdl và password người dùng login
        const isValidPassword = await bcrypt.compare(password, user.password);

        // nếu mà password ko khớp thì thông báo lỗi
        if (!isValidPassword)
            return res.status(400).json("Sai SĐT hoặc mật khẩu...")

        const token = createToken(user._id)
        res.status(200).json({ _id: user.id, name: user.name, phone, role: user.role, avatar: user.avatar, token });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// tìm user dựa vào id
const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// tìm All user
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// tìm user dựa vào số điện thoại
const findUserByPhone = async (req, res) => {
    let { phone } = req.params;
    try {
        const user = await userModel.findOne({phone});
        // Nếu không tìm thấy user, trả về lỗi
        if(!user) return res.status(404).json("Không tìm thấy người dùng này!");

        // Nếu tìm thấy, trả về thông tin người dùng
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Cấu hình nơi lưu trữ file và tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ ảnh trên server
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên file unique dựa trên timestamp
    }
});

const upload = multer({ storage: storage });


// Hàm update avatar
const updateAvatar = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Kiểm tra nếu không có file được tải lên
        if (!req.file) {
            return res.status(400).json('Không có file nào được tải lên.');
        }

        // Lấy đường dẫn của file được tải lên
        const avatarPath = `/uploads/${req.file.filename}`;

        // Tìm user và cập nhật avatar
        let user = await userModel.findById(userId);
        if (!user) return res.status(404).json("Không tìm thấy người dùng này!");

        user.avatar = avatarPath;
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
        });

    } catch (error) {
        console.error('Lỗi khi cập nhật avatar:', error);
        res.status(500).json('Lỗi server.');
    }
}



// xuất ra để file routes sử dụng
module.exports = { registerUser, loginUser, findUser, getUsers, findUserByPhone, upload, updateAvatar  }