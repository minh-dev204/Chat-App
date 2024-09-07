import "../../../../public/styles/group_chat.scss"
import Close_group from "./close_group"
import Name_group from "./name_group"
import List_users from "./list_users"
import Create_group from "./create_group"

// phần này là box để tạo nhóm chat
function Main_groupChats() {
    return <>
        <section className="fixid-boxUpdate show">
            <section className="main-groupChats">
                <Close_group />
                <Name_group />
                <List_users />
                <Create_group />
            </section>
        </section>
    </>
}

export default Main_groupChats
