import Box_left from "./Box_left/Box_left"
import Box_center from "./Box_center/box_center"
import Box_right from "./Box_right/box_right"
import Default_layout from "./Box_right/default_layout"
import "../../public/styles/reponsive/media.scss"
import { useContext } from "react"
import { Auth_context } from "../../context/AuthContext"
import { Chat_context } from "../../context/ChatContext"

function App_chat() {
    const { user } = useContext(Auth_context)
    const { currentChats } = useContext(Chat_context)
    console.log("user", user);


    return <>
        <div className="container-chat">
            <div className="boxChat boxItem1"><Box_left /></div>
            <div className="boxChat boxItem2"><Box_center /></div>
            <div className="boxChat boxItem3">
                {currentChats
                    ?
                    <Box_right />
                    :
                    <Default_layout />
                }

            </div>
        </div>
    </>
}
export default App_chat