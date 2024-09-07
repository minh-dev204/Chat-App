import "../../../public/styles/auth.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useContext } from "react";
// import axios from 'axios'
import { Auth_context } from "../../../context/AuthContext";


function Regsiter() {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { Register, registerErr, setRegisterErr } = useContext(Auth_context)
    function handleRegsiter(data) {
        Register(data)
    }
    return <>
        <div className="container-auth">
            <div className="box-main-auth">
                <div className="box-auth">
                    <div className="tieude-auth">ĐĂNG KÝ TÀI KHOẢN</div>
                    <form className="form-auth" onSubmit={handleSubmit(handleRegsiter)}>
                        <div className="form-group">
                            <TextField {...register("name", { required: true })} className="textField-auth" id="outlined-basic" label="Tên đăng ký" size="small" variant="outlined" />
                            {errors.name && <span className="message-errors">Vui lòng không để trống*</span>}
                        </div>
                        <div className="form-group">
                            <TextField onFocus={() => setRegisterErr(null)}  {...register("phone", { required: true })} className="textField-auth" id="outlined-basic" label="Số điện thoại" size="small" variant="outlined" />
                            {errors.phone && <span className="message-errors">Vui lòng không để trống*</span>}
                        </div>
                        <div className="form-group">
                            <TextField  {...register("pass", { required: true })} className="textField-auth" id="outlined-basic" label="Mật khẩu đăng ký" size="small" variant="outlined" />
                            {errors.pass && <span className="message-errors">Vui lòng không để trống*</span>}
                        </div>

                        {/* avatar để hidden */}
                        <input type="hidden" {...register("avatar")} value="" />
                        <input type="hidden" {...register("role")} value="user" />

                        <div className="btn-group-auth">
                            <Button type="submit" className="btn-auth" variant="contained">Đăng ký</Button>
                        </div>

                        {registerErr && <p className="message-errors p-err">{registerErr}</p>}
                        <p className="dieukhoan-auth">Bạn đăng ký là đồng ý với điều khoản sử dụng và chính sách bảo mật của <a href="/account">Zalo Chat</a></p>
                        <p className="taikhoan-auth">Bạn đã có tài khoản ? <a href="/auth/login">Đăng nhập ngay.</a></p>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Regsiter