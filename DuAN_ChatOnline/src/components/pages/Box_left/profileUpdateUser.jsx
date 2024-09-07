import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useContext, useEffect, useState } from 'react';
import { Auth_context } from '../../../context/AuthContext';

function ProfileUpdateUser({ setCheckClose,  }) {
    const { setSelectedFile, handleUpdateAvatar, userUpdate, user } = useContext(Auth_context)
    //useEffect sẽ chạy khi component được render lần đầu, thêm class .show để kích hoạt animation.
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Thêm class .show sau khi component được render
        setTimeout(() => setVisible(true), 10);
    }, []);


    const handleOnChangeImg = (e) => {
        setSelectedFile(e.target.files[0]);

    }

    return <>
        <div className={`fixid-boxUpdate ${visible ? 'show' : ''}`}>
            <div className="modal">
                <div className="modal-flex-close">
                    <div><h3>Thông tin tài khoản</h3></div>
                    <div onClick={() => setCheckClose(false)} className='btn-close'><CloseIcon sx={{ fontSize: 20 }} /></div>
                </div>
                <div className='bg-avatar'>
                    {userUpdate?.avatar ?
                        // đó là đường dẫn bên server chưa thư mục uploads
                        <img src={`http://localhost:3000${userUpdate.avatar}`} alt="" />
                        :
                        <img src="/src/public/img/avatar_null.jpg" alt="" />
                    }
                </div>

                {/* tyle file */}
                <input type="file" id='file' onChange={(e) => handleOnChangeImg(e)} />
                <label className='label-file' htmlFor="file"><CameraAltIcon /></label>

                <div className='name-img'>
                    <div className='avatar-user'>
                        {userUpdate?.avatar ?
                            // đó là đường dẫn bên server chưa thư mục uploads
                            <img src={`http://localhost:3000${userUpdate.avatar}`} alt="" />
                            :
                            <img src="/src/public/img/avatar_null.jpg" alt="" />
                        }
                    </div>
                    <div className='name'>{user?.name}</div>
                </div>
                <div className='line'></div>
                <div className='profile-user'>
                    <h4>Thông tin cá nhân</h4>
                    <div className='group-grow'>
                        <div className='key'>Giới tính</div>
                        <div className='value'>Nam</div>
                    </div>
                    <div className='group-grow'>
                        <div className='key'>Điện thoại</div>
                        <div className='value'>{user?.phone}</div>
                    </div>
                    <div className='group-grow'>
                        <div className='key'>Role</div>
                        <div className='value'>User</div>
                    </div>
                </div>
                <div className='box-btn-update'>
                    {/* nút gửi */}
                    <div className='btn-update' onClick={(e) => handleUpdateAvatar(e)}>
                        <BorderColorIcon fontSize="small" /> Cập nhật
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ProfileUpdateUser
