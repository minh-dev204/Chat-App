import "../../../public/styles/list_chat.scss"
import Item_chat from "./item_chat"
import Item_search from "./item_search"
import { useContext } from "react"
import { Chat_context } from "../../../context/ChatContext"

function List_chat() {
    let { valueSearch, userChats, SetCurrentChats } = useContext(Chat_context);
    return <>

        <div className="scroll">
            {/* ở đây là có thể hiêu là nếu mà người dùng search thì sẽ có dữ liệu lên
          valueSearch, nếu có dữ liệu thì hiện cái phần item search, ko có thì hiện item user */}
            {valueSearch ?
                <Item_search />
                :
                <>
                    {userChats?.length < 1    /* nếu ko có đoạn chat nào thì hiện thông báo và ngược lại */
                        ?
                        <p className="p-userChat">Không có cuộc trò chuyện nào!</p>
                        :
                        <>
                            {/* lặp nó */}
                            {userChats?.map((chat, index) => {
                                return (
                                    <div key={index} onClick={() => SetCurrentChats(chat)}>
                                        <Item_chat chat={chat} />
                                    </div>
                                )
                              
                            })}
                        </>
                    }
                </>
            }
        </div>

    </>
}
export default List_chat