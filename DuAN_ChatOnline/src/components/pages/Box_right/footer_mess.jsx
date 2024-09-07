import "../../../public/styles/Box_messenger.scss"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useContext, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { Message_context } from "../../../context/MessageContext";
import { Auth_context } from "../../../context/AuthContext";
import { Chat_context } from "../../../context/ChatContext";

function Footer_mess() {
    const { sendMessage } = useContext(Message_context);
    const { currentChats } = useContext(Chat_context);
    const { user } = useContext(Auth_context)
    const [textMessage, setTextMessage] = useState("");
    const [imageFile, setImageFile] = useState("");

    const handleOnchangeFile = (e) => {
        console.log(e.target.files[0]);
        // lấy file ảnh
        setImageFile(e.target.files[0])

    }

    // Gửi tin nhắn khi imageFile được cập nhật
    useEffect(() => {
        if (imageFile) {
            // gọi luôn hàm sendmessage để gửi ảnh
            sendMessage(textMessage, user, currentChats._id, setTextMessage, imageFile, setImageFile)
        }
    }, [imageFile])   // Chỉ chạy khi imageFile thay đổi
    return <>
        <div className="footer_mess">
            <div className="flex_footMess">
                <input onChange={(e) => handleOnchangeFile(e)} type="file" id="file-picture" />
                <div className="div-picture"> <label className="lable-file-picture" htmlFor="file-picture"> <CameraAltIcon /></label></div>
                <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily="arial" borderColor="rgba(72,112,223,0.2)" placeholder="Nhập tin nhắn..." />
                {/* <div className="inp_footMess"><input type="text" placeholder="Nhập tin nhắn của bạn ..." /></div> */}
                {/* <div className="icon_footMess"><NearMeIcon color="primary" sx={{ fontSize: 30 }} /></div> */}
                <button className="send-btn" onClick={() => sendMessage(textMessage, user, currentChats._id, setTextMessage, imageFile, setImageFile)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                    </svg>
                </button>
            </div>
        </div>
    </>
}
export default Footer_mess