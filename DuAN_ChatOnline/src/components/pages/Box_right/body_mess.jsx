import { useContext } from "react";
import "../../../public/styles/Box_messenger.scss"
import ChatUser from "./chat_user";
import { Message_context } from "../../../context/MessageContext";

// phần này chứa list cuộc trò chuyện
function Body_mess() {
    const { messages } = useContext(Message_context)
    return <>
        <div className="body_mess">
            <div className="container_body_mess">
                <div className="list_chat" >
                    {messages && messages.map((mess,index) => {
                        return <ChatUser key={index} mess={mess} />
                    })}
                </div>
            </div>
        </div>
    </>
}
export default Body_mess