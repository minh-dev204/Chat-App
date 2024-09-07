import "../../../public/styles/auth.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { Auth_context } from "../../../context/AuthContext";

function Login() {

   
    const { Login, loginErr, setLoginErr } = useContext(Auth_context)
    const { register, handleSubmit, formState: { errors }, } = useForm();

    function handleLogin(data) {
        Login(data)
    }
    return <>
        <div className="container-auth">
            <div className="box-main-auth">
                <div className="box-auth">
                    <div className="tieude-auth">ĐĂNG NHẬP TÀI KHOẢN</div>
                    <form className="form-auth" onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-group">
                            <TextField onFocus={() => setLoginErr(null)} {...register("phone", { required: true })} className="textField-auth" label="Số điện thoại" size="small" variant="outlined" />
                            {errors.phone && <span className="message-errors">Vui lòng không để trống*</span>}
                        </div>
                        <div className="form-group">
                            <TextField type="password" onFocus={() => setLoginErr(null)}  {...register("pass", { required: true })} className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
                            {errors.pass && <span className="message-errors">Vui lòng không để trống*</span>}
                        </div>

                        <div className="btn-group-auth">
                            <Button type="submit" className="btn-auth" variant="contained">Đăng nhập</Button>
                        </div>

                        {loginErr && <p className="message-errors p-err">{loginErr}</p>}
                        <p className="dieukhoan-auth">Bạn đăng nhập là đồng ý với điều khoản sử dụng và chính sách bảo mật của <a href="/account">Zalo Chat</a></p>
                        <p className="taikhoan-auth">Bạn chưa có tài khoản ? <a href="/auth/regsiter">Đăng ký ngay.</a></p>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Login