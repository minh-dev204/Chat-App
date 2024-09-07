import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { Auth_context } from "./AuthContext";
import { Notification_context } from "./Notifications";

const Chat_context = createContext();
// phần context này sẽ sử lý : search, load userchat, xóa userchat,...

const ChatProvider = ({ children, }) => {
    // lấy đc user ở đây vì tk authProvider nó bọc tk ChatProvider
    let { user } = useContext(Auth_context)

    //state này vừa dùng để lấy valueSearch mà còn dùng để check nếu nó = true thì hiện item search, ko thì hiện item user
    const [valueSearch, SetValueSearch] = useState("");
    const [searchErr, SetSearchErr] = useState(null);
    const [userSearch, SetSserSearch] = useState(null);
    const [userChats, SetUserChats] = useState([]); // state này chứa các user mà trò chuyện vs mình

    const [currentChats, SetCurrentChats] = useState(null);  
    //state SetCurrentChats này để lấy đc id đoạn chat để xí dựa id đó để lấy ra đc list message
    // state SetcurrenChats này sẽ hoạt động khi click vào userChat nó sẽ lấy đc chat của mỗi thằng
    // minh họa {_id: "jfafak12", firsId: "123", secondId: "456"} chủ yếu là nó sẽ lấy id để tí load ra được danh sách tin nhắn

    const [thongBao, setThongBao] = useState([])

    console.log("currentChats",currentChats);
    

    // hàm sử lý khi người dung search
    const handleSearch = async (data) => {
        try {
            SetValueSearch(data);
            // có data là sdt rồi, gọi api 
            let res = await axios.get(`http://localhost:3000/auth/findByPhone/${data}`)

            // trả về người dùng tìm thấy
            console.log(res.data);
            SetSserSearch(res.data)
            // nếu tìm thấy thì set lại cái lỗi bằng null
            SetSearchErr(null)
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data);
                SetSearchErr(error.response.data)
            }
        }
    };

    // hàm sử lý tạo đoạn chat 2 người
    const handleCreateChat = async (firsId, secondId) => {
        // console.log("firsId", firsId);
        // console.log("second", secondId);
        try {
            let res = await axios.post(`http://localhost:3000/chats`, {
                firsId, secondId
            })
            // khi mà create xong thì cho cái userSearch đó ẩn đi
            SetValueSearch("")
            console.log(res.data);
            // set lại userChat
            SetUserChats((prev) => [
                ...prev,
                res.data
            ])

        } catch (error) {
            console.log(error);

        }
    }

    // tk này sẽ load các userChats dựa vào id user
    useEffect(() => {
        const getUserChats = async () => {
           try {
              if(user?._id) {
                  let res = await axios.get(`http://localhost:3000/chats/${user?._id}`)
                  console.log(res.data);
                  SetUserChats(res.data)
              }
           } catch (error) {
               console.log(error);
               
           }
        }
        getUserChats()
    }, [user,thongBao])



    return <>
        <Chat_context.Provider value={{
            handleSearch,
            valueSearch,
            searchErr,
            userSearch,
            handleCreateChat,
            userChats,
            SetCurrentChats,
            currentChats,
            thongBao, 
            setThongBao
        }}>
            {children}
        </Chat_context.Provider>
    </>
}

export { Chat_context, ChatProvider }