import { useContext } from "react"
import "../../../public/styles/item_chat.scss"
import "../../../public/styles/reponsive/media.scss"
import { Auth_context } from "../../../context/AuthContext"
import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient"
import { Message_context } from "../../../context/MessageContext"
import { Notification_context } from "../../../context/Notifications"
import { unreadNotificationsFunc } from "../../../hooks/unreadNotifications"
import { Chat_context } from "../../../context/ChatContext"
import { useFetchLastMessage } from "../../../hooks/useFetchLastMessage"

function Item_chat({ chat }) {
    const { user } = useContext(Auth_context)
    const { onlineUsers } = useContext(Message_context)
    const { thongBao } = useContext(Chat_context)
    const { markThisUserNotificationsAsRead } = useContext(Notification_context)
    const { recipientUser } = useFetchRecipientUser(chat, user);

    // hàm này nó sẽ lọc ra những thông báo chưa đọc
    const unreadNotifications = unreadNotificationsFunc(thongBao);

    // hàm này nó sẽ hiện thông báo theo tưng người (thông báo của người nào hiện ra người đó)
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId == recipientUser?._id
    )

    console.log("thisUserNotifications", thisUserNotifications);

    let { lastMessage } = useFetchLastMessage(chat)

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText = shortText + "..."
        }

        return shortText;
    }



    // console.log("recipientUser",recipientUser);
    if (!recipientUser) {
        return;
    }

    return <>
        {/* item user PC & tablet */}
        <div className="boxItem_chat boxItem_chatPC" onClick={() => markThisUserNotificationsAsRead(thisUserNotifications, thongBao)}>
            <div className={
                onlineUsers.some((user) => {
                    return user?.userId === recipientUser?._id
                }) ? "online-user" : ""
            }></div>
            <div className="boxItem_chat_flex">
                <div className="avate_chat">
                    {recipientUser.avatar ?
                        <img src={`http://localhost:3000${recipientUser.avatar}`} alt="" />
                        :
                        <img src="/src/public/img/avatar_null.jpg" alt="" />
                    }
                </div>

                <div className="boxMain_userChat">
                    <div className="boxChat_nameTime">
                        <div className="name_userChat">{recipientUser.name}</div>
                        <div className="time_userChat">4 giờ</div>
                    </div>
                    <div className="last-mesage-thongbao">
                        <div className="messenger_chat">
                            {lastMessage?.text && truncateText(lastMessage?.text)}
                            {lastMessage?.image && <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                            </svg> Hình ảnh</>}
                        </div>
                        {thisUserNotifications?.length > 0 ? <div className="thongbao">{thisUserNotifications?.length}</div> : ""}

                    </div>
                </div>
            </div>
        </div>


        {/* mobile */}
        {/* <div className="boxItem_chat boxItem_chatMobile">
            <div className="boxItem_chat_flex">
                <div className="avate_chat"><img src="/src/public/img/avt_buiminh.jpg" alt="" /></div>

                <div className="boxMain_userChat">
                    <div className="boxChat_nameTime">
                        <div className="name_userChat">Thanh Thảo</div>
                        <div className="time_userChat">4 giờ</div>
                    </div>
                    <div className="messenger_chat">Dạ anh</div>
                </div>
            </div>
        </div> */}
    </>
}
export default Item_chat