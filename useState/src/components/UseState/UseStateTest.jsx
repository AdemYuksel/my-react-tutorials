import React, { useState } from "react";
import "./UseStateTest.css"

const UseStateTest = (props) => {
    const [title, setTitles] = useState(props.title);
    const [input, setInput] = useState(props.input);

    const clickHandler = () => {
        setInput(title);
    }

    const handleChange = (event) => {
        setTitles(event.target.value);
    };

    return (
        <div className="display">
            <div className="card">
                <div className="center">
                    {input ? (<h1>{input}</h1>) : (<h1>My Message</h1>)}
                    <input type="text" placeholder="Type a message..." onChange={handleChange} ></input>
                    <button onClick={clickHandler}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default UseStateTest;