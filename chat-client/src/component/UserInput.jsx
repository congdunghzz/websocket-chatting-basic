import {useState, useContext } from "react"
import { UserContext } from "../context/UserContext";
function UserInput() {

    const userContext = useContext(UserContext);

    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmitClick = (e) => {
        userContext.setUser(name);
        setName('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card w-75">
                <h1 className="text-center m-5">Connect to the chat box</h1>
                <div className="mx-5 d-flex justify-content-center align-items-center mt-5">
                    <div className="input-group mb-5 w-75">
                        <input type="text" className="form-control" 
                        placeholder="Enter your name" aria-label="Recipient's username" 
                        aria-describedby="button-addon2" 
                        value={name} onChange={handleNameChange}/>
                        <button className="btn btn-outline-success" type="button" id="button-addon2" onClick={handleSubmitClick}>Go to Chat Box</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInput;