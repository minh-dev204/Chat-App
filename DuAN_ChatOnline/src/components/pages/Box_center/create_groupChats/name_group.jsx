import CameraAltIcon from '@mui/icons-material/CameraAlt'
import "../../../../public/styles/Box_messenger.scss"
function Name_group() {
    return <>
        <section className="box-nameGroup">
            <div className="name-group">
                <div className='name-group-box1'>
                    <input type="file" id="file-picture2" />
                    <div className="div-picture"> <label className="lable-file-picture" htmlFor="file-picture2"> <CameraAltIcon /></label></div>
                </div>
                <div className='name-group-box2'>
                    <input type="text" placeholder='Nhập tên nhóm..'/>
                </div>
            </div>
            <div className="search-group">
                <div className='box-search-group'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Nhập số điện thoại' />
                </div>
            </div>
        </section>
    </>
}

export default Name_group
