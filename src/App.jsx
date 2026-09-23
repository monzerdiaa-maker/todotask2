import { useRef, useState } from "react"
import "./App.css";

function App() {
    const [todo, settodo] = useState([])

    const inputRef = useRef();

    const HDT = () => {
        const text = inputRef.current.value;
        if (!text.trim()) return;
        const item = { complated: false, text }
        settodo([...todo, item])
        inputRef.current.value = "";
    }

    const HID = (index) => {
        const newtodo = [...todo];
        newtodo[index].complated = !newtodo[index].complated;
        settodo(newtodo);
    }

    const HDI = (index) => {
        const newtodo = [...todo];
        newtodo.splice(index, 1);
        settodo(newtodo)
    }


    return (
        <>
            <h2>TO DO LIST</h2>
            <ul>
                {todo.map(({ text, complated }, index) => {
                    return (<div>
                        <li className={complated ? "done" : ""} key={index}  >{text}</li>
                        <div className="small">
                            <span className="span-delet" onClick={() => HDI(index)}>delet</span>
                            <span className="span-done" onClick={() => HID(index)}>done</span></div>
                    </div>)
                })}
            </ul>
            <input ref={inputRef} />
            <button onClick={HDT}>add task</button>
        </>
    )
};

export default App;