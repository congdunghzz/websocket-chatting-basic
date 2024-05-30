import { useState, useEffect, useContext } from "react"
import UserInput from "../component/UserInput";
import { UserContext } from "../context/UserContext";
import "./Chat.css"
function Chat() {

    const [isConnected, setIsConnected] = useState(false);
    const userContext = useContext(UserContext);
    const [tab, setTab] = useState('');
    const [username, setUsername] = useState('');

    const userList = ['Cong Dung', "Bao Duy", "ALious", "Thanh Trung"]
    const handleTagChange = (current) =>{
        setTab(current);
    }
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    useEffect(() => {
        if (!userContext.user) {
            setIsConnected(false);
            return;
        }
        setUsername(userContext.user);
        setIsConnected(true);
    }, [userContext.user]);
    return (
        <>
            {
                !isConnected ?
                    <UserInput />
                    :
                    <div className="container my-5 ">
                        <div className="card main-content">
                            <div className="row d-flex w-100 justify-content-center h-100">
                                <div className="col-3 bg-info-subtle px-0">
                                    <div className="list-group w-100">
                                        <button type="button" 
                                            className={`${ 'Public Room' !== tab && 'list-group-item list-group-item-info'} btn btn-info`} aria-current="true"
                                            onClick={()=>{handleTagChange('Public Room')}}>
                                            Public Room
                                        </button>
                                        {
                                            userList.map((user, index) =>(
                                                <button key={index} type="button" 
                                                    className={`${ user !== tab && 'list-group-item list-group-item-info'} btn btn-info`}
                                                    onClick={()=>{handleTagChange(user)}}>
                                                    {user}
                                                </button>

                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="chat-box col-9 position-relative py-3">
                                    <ul className="message-list px-1 mb-5">
                                        <li className="mb-4 d-flex ">
                                            <div className="avatar rounded-circle bg-success d-flex justify-content-center align-items-center"
                                            >
                                                <h5 className="text-light ">A</h5>
                                            </div>
                                            <div className="message-content bg-light ms-3 p-3" lh-sm>
                                                aaaaa  aaa aa aa aa aa aa aa aa a
                                                â aa aaa aa aa aa aa aa aa aa
                                                â aa aaa aa aa aa aa aa aa aa
                                                â aa aaa aa aa aa aa aa aa aa 
                                            </div>
                                        </li>
                                        <li className="mb-4 d-flex justify-content-end">
                                            
                                            <div className="message-content bg-info-subtle me-3 p-3" lh-sm>
                                                aaaaa  aaa aa aa aa aa aa aa aa a
                                                â aa aaa aaa a a a a a a a alooo
                                            </div>
                                            <div className="avatar rounded-circle bg-success d-flex justify-content-center align-items-center">
                                                <h5 className="text-light ">{username.charAt(0)}</h5>
                                            </div>
                                        </li>
                                        <li className="mb-4 d-flex ">
                                            <div className="avatar rounded-circle bg-success d-flex justify-content-center align-items-center">
                                                <h5 className="text-light ">A</h5>
                                            </div>
                                            <div className="message-content bg-light ms-3 p-3" lh-sm>
                                                aaaaa  aaa aa aa aa aa aa aa aa a
                                                â aa aaa aa aa aa aa aa aa aa
                                                â aa aaa aa aa aa aa aa aa aa
                                                â aa aaa aa aa aa aa aa aa aa 
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="input-group mt-5 mb-3 w-75 position-absolute bottom-0 start-50 translate-middle-x ">
                                        <input type="text" className="form-control"
                                            placeholder="message"
                                            aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <button className="btn btn-primary">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default Chat;