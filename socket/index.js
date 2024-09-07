const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });


// on là lắng nghe sự kiên
// emit là phát đi sự kiện

let onlineUser = []
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    // lắng nghe sk addNewUser bên fronend
    socket.on("addNewUser", (userId) => {
        // 
        !onlineUser.some((user) => user.userId === userId) &&
            onlineUser.push({
                userId,
                socketId : socket.id
            })

            console.log("onlinerUser", onlineUser);

            io.emit("getOnlineUsers", onlineUser)
            
    })


    // add message && thông báo
    socket.on("sendMessage", (message) => {
        // recipientId có thể hiểu là id người nhận
        const user = onlineUser.find(user => user.userId === message.recipientId)

        if (user) {
            io.to(user.socketId).emit("getMessage", message)

            io.to(user.socketId).emit("getThongBao", {
                senderId: message.senderId,
                isRead: false, // check thông báo đọc hay chưa,
                data : new Date()
            })
        }
    })

    // ngắt kết nối người dùng
    socket.on("disconnect", () => {
        // nó sẽ lọc mảng userOnline
        // nó sẽ trả về mảng mới ko có những tk user.socketId !== socket.id
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id)

        // gửi dữ liệu lên lại client
        io.emit("getOnlineUsers", onlineUser)
    })
})

io.listen(4001)