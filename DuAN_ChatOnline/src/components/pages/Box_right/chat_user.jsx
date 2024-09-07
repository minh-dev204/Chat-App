// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext, useRef, useEffect } from "react"
import { Auth_context } from "../../../context/AuthContext"
import moment from "moment"
import { Chat_context } from "../../../context/ChatContext"

// chat use ở đây có nghĩa là bạn mình chat với mình
function ChatUser({ mess }) {
    let { user } = useContext(Auth_context)
    const { messages } = useContext(Chat_context)


    // useRef 
    const scroll = useRef();
    // phần này tôi sẽ thực hiện khi ai đó nhắn thì nó sẽ cuộn tới cái phần nhắn mà ko phải tự cuộn
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return <>
        <div className={`${mess.senderId === user?._id ? "container-chatYour" : "container-chatUser"}`} ref={scroll} >
            <div className={`${mess.senderId === user?._id ? "box-chatYour" : "box-chatUser"}`}>
                <div className="flex-boxChatUser">
                    {mess.text && <div className="content-chatUser">{mess?.text}</div>}
                    {mess.image && <div className="mess-image"><img  src={`http://localhost:3000/uploads/imgChat/${mess?.image}`} alt="" /></div>}
                    <div className={`${mess.senderId === user?._id ? "time-chatYour" : "time-chatUser"}`}>
                        {moment(mess.createdAt).calendar()}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ChatUser