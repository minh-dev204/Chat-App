import "../../../public/styles/Box_left.scss"
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useState } from "react";
import { Auth_context } from "../../../context/AuthContext";
import ProfileUpdateUser from "./profileUpdateUser";

function Box_left() {
    const { Logout, user, userUpdate } = useContext(Auth_context)
    let [check, setCheck] = useState(false)  //useState này để set ẩn hiện cái logout khi click vào setting
    let [checkClose, setCheckClose] = useState(false)  //useState này để set ẩn hiện cái thông tin tài khoản khi click 
    function handleCheck() {
        setCheck(!check)
    }

    function handleCheckProfile() {
        setCheck(false)
        setCheckClose(true)
    }

    return <>
        <div className="Box_left">
            <div className="main-avater">
                <div className="avatar" onClick={handleCheckProfile}>
                    {userUpdate?.avatar ?
                    // đó là đường dẫn bên server chưa thư mục uploads
                        <img src={`http://localhost:3000${userUpdate.avatar}`} alt="" />
                        :
                        <img src="/src/public/img/avatar_null.jpg" alt="" />
                    }
                </div>

                {/* <div className="avatar"><img src="/src/public/img/avatar_null.jpg" alt="" /></div> */}
            </div>
            <div className="listItem_BoxLeft">
                <ul className="BoxLeft_ul1">
                    <li><ChatIcon sx={{ fontSize: 30 }} /></li>
                    <li><GroupsIcon sx={{ fontSize: 30 }} /></li>
                </ul>
                <ul className="BoxLeft_ul2">
                    <li onClick={handleCheck}><SettingsIcon sx={{ fontSize: 30 }} /></li>

                    {check && (<div className="box-setting-logout">
                        <ul>
                            <li onClick={handleCheckProfile} className="li-box-setting li-box">Thông tin tài khoản</li>
                            <li onClick={Logout} className="li-box-logout li-box">Đăng xuất</li>
                        </ul>
                    </div>)}
                </ul>
            </div>
        </div>

        {/* phần này là thông tin tài khoản */}
        {checkClose && <ProfileUpdateUser setCheckClose={setCheckClose} />}

    </>
}
export default Box_left