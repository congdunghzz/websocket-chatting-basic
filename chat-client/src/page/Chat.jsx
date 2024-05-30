import { useState, useEffect, useContext } from "react"
import SockJS from "sockjs-client";
import { over } from 'stompjs';
import UserInput from "../component/UserInput";
import { UserContext } from "../context/UserContext";
import "./Chat.css"
import { BaseUrl } from "../util/BaseUrl/BaseUrl";
import axios from "axios";

let stompClient = null;

function Chat() {

    const [isConnected, setIsConnected] = useState(false);
    const userContext = useContext(UserContext);
    const [tab, setTab] = useState('');
    const [username, setUsername] = useState('');

    const [message, setMessage] = useState('');

    const [publicChat, setPublicChat] = useState([]);

    const [userList, setUserList] = useState([]);
    const handleTagChange = (current) => {
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
  

    const handleConnect = () => {
        var sockJS = new SockJS(BaseUrl + '/ws');
        stompClient = over(sockJS);
        stompClient.connect({}, onConnect, onError)

    }
    const onConnect = () => {
        stompClient.subscribe('/chatroom/public', onReceivePublicMessage);
        stompClient.subscribe(`/user/${username}/queue/update`, onReceivePrivateMessage);
        const message = {
            senderId: username,
            recipientId: '',
            content: `${username} has joined`,
            status: 'JOIN'
        }
        stompClient.send('/app/user/add', {}, JSON.stringify(message))
    };

    const onError = (e) => {
        console.log(e);
    };
    const onReceivePublicMessage = (payload) => {
        const data = JSON.parse(payload.body);
        switch (data.status) {
            case 'JOIN':
                setUserList(prevList => [...prevList, data.senderId]);
                break;
            case 'CHAT':
                setPublicChat(prevPublicChat => [...prevPublicChat, data]);

                break;
            case 'LEAVE':
                break;
        }
    };
    const onReceivePrivateMessage = (payload) => {

    };

    const getUser = async () => {
        const response = await axios.get(BaseUrl + '/user');
        setUserList(response.data);

    }

    const handleSendMessage = () => {
        if (stompClient) {
            const payload = {
                senderId: username,
                recipientId: '',
                content: message,
                status: 'CHAT'
            }
            stompClient.send('/app/chat/all', {}, JSON.stringify(payload))
            
            setMessage('')
        }
    }

    useEffect(() => {
        if (isConnected) {
            getUser()
        }else{
            return ;
        }
    }, [isConnected]);

    useEffect(() => {
        if (!userContext.user) {
            setIsConnected(false);
            return;
        }
        setUsername(userContext.user);
        setIsConnected(true);
    }, [userContext.user]);

    useEffect(() => {
        if (isConnected) {
            handleConnect();
        }
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log("Disconnected");
                });
            }
        };
    }, [username, isConnected]);
    
    
    return (
        <>
            {
                !isConnected ?
                    <UserInput  />
                    :
                    <div className="container my-5 ">
                        <div className=" main-content">
                            <div className="row d-flex w-100 justify-content-center h-100">
                                <div className="col-3 bg-info-subtle px-0 chat-bar">
                                    <div className="list-group w-100">
                                        <button type="button"
                                            className={`${('Public Room' !== tab || !tab) && 'list-group-item list-group-item-info'} btn btn-info`} aria-current="true"
                                            onClick={() => { handleTagChange('Public Room') }}>
                                            Public Room
                                        </button>
                                        {
                                            userList.map((user, index) => (
                                                <button key={index} type="button"
                                                    className={`${user !== tab && 'list-group-item list-group-item-info'} btn btn-info`}
                                                    onClick={() => { handleTagChange(user) }}>
                                                    {user}
                                                </button>

                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="chat-box col-9 position-relative py-3">
                                    <div className="mb-3 chat-content">
                                    {
                                        publicChat.length !== 0 &&
                                        (
                                            <ul className="message-list px-1 mb-5">
                                                {
                                                    publicChat.map((chat, index) => {
                                                        if (username === chat?.senderId) {
                                                            return (
                                                                <li key={index} className="mb-4 d-flex justify-content-end">
                                                                    <div className="message-content bg-info-subtle me-3 p-3" lh-sm>
                                                                        {chat.content}
                                                                    </div>
                                                                    <div className="avatar rounded-circle bg-success d-flex justify-content-center align-items-center">
                                                                        <h5 className="text-light ">{username.charAt(0)}</h5>
                                                                    </div>
                                                                </li>
                                                            )
                                                        } else {
                                                            return (
                                                                <li key={index} className="mb-4 d-flex ">
                                                                    <div className="avatar rounded-circle bg-success d-flex justify-content-center align-items-center"
                                                                    >
                                                                        <h5 className="text-light ">{chat.senderId.charAt(0)}</h5>
                                                                    </div>
                                                                    <div className="message-content bg-light ms-3 p-3" lh-sm>
                                                                        {chat.content}
                                                                    </div>
                                                                </li>
                                                            )
                                                        }
                                                    })
                                                }

                                            </ul>
                                        )
                                    }
                                    </div>
                                    <div className="input-group mt-5 mb-3 px-5 position-absolute bottom-0 start-50 translate-middle-x ">
                                        <input type="text" className="form-control"
                                            placeholder="message"
                                            aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            value={message} onChange={(e) => { setMessage(e.target.value) }} />
                                        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
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