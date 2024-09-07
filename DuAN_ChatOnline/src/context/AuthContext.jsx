import { createContext, useState, useEffect } from "react";
import axios from "axios";

const Auth_context = createContext();

const AuthProvider = ({ children }) => {
    const [registerErr, setRegisterErr] = useState(null); // set lỗi 400 register
    const [loginErr, setLoginErr] = useState(null); // set lỗi 400 register
    const [user, setUser] = useState(null); // state lưu user người dùng
    const [selectedFile, setSelectedFile] = useState(null);
    const [checkUpdate, setCheckUpdate] = useState(null) // state này để check là khi upload ảnh thành công nó sẽ báo hiệu cho hàm findIduser
    const [userUpdate, setUserUpdate] = useState(null) // state này nó sẽ load id user đc update ảnh


    useEffect(() => {
        const loadUser = () => {
            const userData = localStorage.getItem("userZalo");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        loadUser();
    }, [])




    // hàm này tìm user dựa vào id mục đích của nó là khi tôi upload ảnh thì dựa vào hàm này tìm user đó và hiện ảnh lên web đỡ mất công load lại
    // đưa hàm đó vào hàm uploadFile

    useEffect(() => {
        if (!user?._id) return; // Kiểm tra `user` và `user._id`

        const findIdUser = async (idFind) => {
            try {
                let res = await axios.get(`http://localhost:3000/auth/find/${idFind}`);
                setUserUpdate(res.data)

            } catch (error) {
                console.log(error);

            }
        }
        findIdUser(user?._id)
    }, [user, checkUpdate])


    const Register = async (data) => {
        try {
            let res = await axios.post(`http://localhost:3000/auth/register`, {
                name: data.name,
                password: data.pass,
                phone: data.phone,
                avatar: data.avatar,
                role: data.role,
            })
            console.log("Đăng ký thành công", res);
            // navigateTo("auth/login");\
            window.location.href = "/auth/login"; // ở context ko dùng useNavigate đc
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setRegisterErr(error.response.data)
            } else {
                console.log("Đăng ký thất bại !");
            }
        }
    }


    const Login = async (data) => {
        try {
            let res = await axios.post(`http://localhost:3000/auth/login`, {
                phone: data.phone,
                password: data.pass,
            });
            console.log(res.data);
            localStorage.setItem("userZalo", JSON.stringify(res.data))
            window.location.href = "/account";

        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setLoginErr(error.response.data)
            }
            else {
                console.log("Đăng nhập thất bại !");
            }

        }
    }

    const Logout = () => {
        localStorage.removeItem("userZalo");
        window.location.href = "/auth/login";
    }

    // uplaod file
    const handleUpdateAvatar = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            console.log("Bạn chưa chọn ảnh nào!");
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        console.log(formData);
        try {
            const response = await axios.post(`http://localhost:3000/auth/update-avatar/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // check xem có sự update ko để đưa lên effect findUserId
            setCheckUpdate(response.data)
            console.log('Avatar updated:', response.data);
            console.log("Cập nhật ảnh đại diện thành công!");
        } catch (error) {
            console.error('Lỗi khi cập nhật avatar:', error);
            // alert("Có lỗi xảy ra khi cập nhật ảnh đại diện!");
        }
    }

    return <>
        <Auth_context.Provider value={{
            Register,
            registerErr,
            setRegisterErr,
            Login,
            loginErr,
            setLoginErr,
            user,
            Logout,
            setSelectedFile,
            handleUpdateAvatar,
            userUpdate
        }}>
            {children}
        </Auth_context.Provider>
    </>
}

export { Auth_context, AuthProvider }