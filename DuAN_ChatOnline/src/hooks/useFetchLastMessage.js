// hàm này nó sẽ lấy tin nhắn cuối cùng
import { useContext, useEffect, useState } from "react";
import { Chat_context } from "../context/ChatContext";
import axios from "axios";
import { Message_context } from "../context/MessageContext";


export const useFetchLastMessage = (chat) => {
    const { thongBao } = useContext(Chat_context)
    const{newMassage} = useContext(Message_context)
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null)


    useEffect(() => {
        const getMessage = async () => {

            const response = await axios.get(`http://localhost:3000/messages/${chat?._id}`)
            if (response.error) {
                return setError(error)
            }
            // console.log("lastText", response);
            let data = response.data
            console.log("lastText", data);
            const lastMessage = data[data?.length - 1];
            setLastMessage(lastMessage)
        }
        getMessage()
    }, [newMassage, thongBao])

    return { lastMessage }
}