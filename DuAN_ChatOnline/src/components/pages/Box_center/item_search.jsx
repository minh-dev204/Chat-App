import "../../../public/styles/item_chat.scss"
import "../../../public/styles/reponsive/media.scss"
import { useContext } from "react"
import { Chat_context } from "../../../context/ChatContext"
import { Auth_context } from "../../../context/AuthContext"

function Item_search() {
    const { user } = useContext(Auth_context)
    const { searchErr, userSearch, handleCreateChat } = useContext(Chat_context)
    return <>
        {!searchErr // nếu có tìm thấy thì hiện thông tin, ko có thì hiện thông báo
            ?
            <div className="boxItem_chat boxItem_chatPC" onClick={() => handleCreateChat(user?._id, userSearch?._id)}>
                <div className="boxItem_chat_flex">
                    <div className="avate_chat">
                        {userSearch?.avatar
                            ?
                            <img src={`http://localhost:3000${userSearch.avatar}`} alt="" />
                            :
                            <img src="/src/public/img/avatar_null.jpg" alt="" />
                        }
                    </div>

                    <div className="boxMain_userChat">
                        <div className="boxChat_nameTime">
                            {/* lý do hỏi chấm ở đây là để check cái userSearch này có hay ko */}
                            <div className="name_userChat">{userSearch?.name}</div>
                        </div>
                        <div className="messenger_chat">{userSearch?.phone}</div>
                    </div>
                </div>

            </div>
            :
            <p className="p-search-err">{searchErr}</p>
        }
    </>
}

export default Item_search
