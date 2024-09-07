import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);

    // console.log("chat", chat);
    // console.log("user", user);

    // ở đây có thể hiểu là nó sẽ lấy id người nhắn tin với bạn dựa vào id bạn đăng nhập vào
    const recipientId = chat?.members.find((id) => id !== user?._id)
    // console.log("recipientId",recipientId);


    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) {
                return;
            }
            // phần này sử lý api , load user dựa vào id
            let res = await axios.get(`http://localhost:3000/auth/find/${recipientId}`)
           
            setRecipientUser(res.data)
        }
        getUser()
    }, [recipientId])

    return { recipientUser }
}