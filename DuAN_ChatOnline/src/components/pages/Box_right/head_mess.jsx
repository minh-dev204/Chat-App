import "../../../public/styles/head_mess.scss"
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { useFetchRecipientUser } from "../../../hooks/useFetchRecipient.js"
import { useContext } from "react"
import { Auth_context } from "../../../context/AuthContext"
import { Chat_context } from "../../../context/ChatContext"

function Head_mess() {
    const { user } = useContext(Auth_context);
    const { currentChats } = useContext(Chat_context);

    // useFetchRecipientUser truyền tham số vào nó sẽ lọc ra 
    const { recipientUser } = useFetchRecipientUser(currentChats, user);
    return <>
        <div className="boxHead_mess">
            <div className="boxHead_inline">
                <div className="mainAtavarUser">
                    <div className="avateUser">
                        {recipientUser?.avatar ?
                            // đó là đường dẫn bên server chưa thư mục uploads
                            <img src={`http://localhost:3000${recipientUser.avatar}`} alt="" />
                            :
                            <img src="/src/public/img/avatar_null.jpg" alt="" />
                        }
                    </div>
                </div>
            </div>

            <div className="boxHead_nameUser_icon">
                <div className="boxHead_nameUser">{recipientUser?.name}</div>
                <div className="boxHead_icon"><DoubleArrowIcon color="disabled" /></div>
            </div>
        </div>
    </>
}
export default Head_mess