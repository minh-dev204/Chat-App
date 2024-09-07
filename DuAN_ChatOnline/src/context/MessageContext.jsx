import { createContext, useContext, useEffect, useState } from "react";
import { Chat_context } from "./ChatContext";
import axios from "axios";
import { io } from "socket.io-client"
import { Auth_context } from "./AuthContext";

// context này sẽ xử lý vd như gửi tin nhắn ,load tin nhắn,...
const Message_context = createContext();

const MessageProvider = ({ children }) => {
    const { user } = useContext(Auth_context);
    const { currentChats, thongBao,setThongBao } = useContext(Chat_context);
    const [messages, setMessages] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    // const [thongBao, setThongBao] = useState([])

    console.log("Thong báo",thongBao);
    


    // initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:4001")
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    // add online users
    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", user?._id)

        // tk client nó sẽ nhận đc userOnlie nt đc socket gửi qua 
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket])

    // send mesage
    useEffect(() => {
        if (socket === null) return

        const recipientId = currentChats?.members?.find((id) => id !== user?._id)
        // recipientId ở đây là id người nhận
        socket.emit("sendMessage", { ...newMessage, recipientId })
    }, [newMessage])
    // cái newMessage này là bên hàm sendTextMessage khi mình nhắn thì lấy dữ liệu trả về set vào newMessage


    // sendtext socket
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            if (currentChats?._id !== res.chatId) return

            //    nó sẽ lấy tin nhắn trả về đưa vào state message
            setMessages((prev) => [...prev, res])
        })

        socket.on("getThongBao", (res) => {
            // Đây là biến kiểm tra xem người dùng hiện tại có đang mở cuộc trò chuyện(chat) với người gửi thông báo hay không.
            const isChatOpen = currentChats?.members.some(id => id === res.senderId)

            if(isChatOpen) {
                setThongBao(prev => [
                    { ...res, isRead: true },   // set lại đã đọc isRead: true
                    ...prev
                ])
            }else {
                setThongBao(prev => [res, ...prev])
            }
        })


        // socket.on("getThongBao", res)
        return () => {
            socket.off("getMessage")
            socket.off("getThongBao")
        }

    }, [socket, currentChats])


    // lấy tất cả tin nhắn dựa vào id đoạn chat
    useEffect(() => {
        const getMessages = async () => {
            try {
                let res = await axios.get(`http://localhost:3000/messages/${currentChats?._id}`)
                console.log(res.data);
                setMessages(res.data)

            } catch (error) {
                console.log(error);

            }
        }
        getMessages();
    }, [currentChats])


    // send messages
    const sendMessage = async (textMessage, sender, currenChatId, setTextMessage, imageFile, setImageFile) => {

        // Kiểm tra nếu không có nội dung tin nhắn và không có hình ảnh
        if (!textMessage.trim() && !imageFile) {
            console.log("Không thể gửi tin nhắn rỗng hoặc không có hình ảnh.");
            return;
        }

        const formData = new FormData();
        formData.append("chatId", currenChatId);
        formData.append("senderId", sender._id);
        if (textMessage) formData.append("text", textMessage);
        if (imageFile) formData.append("image", imageFile);

        try {
            let res = await axios.post(`http://localhost:3000/messages`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res.data);

            setNewMessage(res.data)
            // cập nhật lại đoạn message
            setMessages((prev) => [
                ...prev,
                res.data
            ])
            setTextMessage("")
            setImageFile("")

        } catch (error) {
            console.log(error);

        }
    }

    return <>
        <Message_context.Provider value={{
            messages,
            setMessages,
            sendMessage,
            onlineUsers,
        }}>
            {children}
        </Message_context.Provider>
    </>
}

export { Message_context, MessageProvider }