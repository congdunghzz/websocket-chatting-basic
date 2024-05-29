import { useState, useEffect, useContext } from "react"
import UserInput from "../component/UserInput";
import { UserContext } from "../context/UserContext";
function Chat() {

    const [isConnected, setIsConnected] = useState(false);
    const userContext = useContext(UserContext);

    useEffect(() => {
        if(!userContext.user){
            setIsConnected(false);
            return;
        }
        setIsConnected(true);
    });
    return (
        <>
            {
                !isConnected ? 
                    <UserInput />
                    :
                    <div>
                        <h1>Welcome to Chat Application</h1>
                    </div>
            }

        </>
    )
}

export default Chat;