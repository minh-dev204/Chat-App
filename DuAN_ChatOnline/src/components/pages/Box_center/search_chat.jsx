import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useContext } from 'react';
import { Chat_context } from '../../../context/ChatContext';


function Search_chat() {
    const { handleSearch, valueSearch } = useContext(Chat_context)

    // hàm này sẽ sử lý ko cho nhập chử chỉ đc nhập số
    const handleInputChange = (e) => {  
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
        handleSearch(onlyNumbers);
    };

    return <>
        <div className="boxMain-search">
            <div className="list-search">
                <div className="box-search">
                    <div className="icon_inp ">
                        <div className="icon"><SearchIcon sx={{ fontSize: 20 }} /></div>
                        <div className="input">
                            <input value={valueSearch} onChange={handleInputChange} type="tel" pattern="[0-9]{10}" placeholder="Tìm kiếm trên halo..." />
                        </div>
                    </div>
                </div>

                <div className="icon-userAdd"><PersonAddAltIcon /></div>
                <div className="icon-groupAdd"><GroupAddIcon /></div>
            </div>
        </div>
    </>
}

export default Search_chat
