import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
    const [todo, settodo] = useState(() => {
        const savedtasks = localStorage.getItem("usertasks");

        return savedtasks ? JSON.parse(savedtasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("usertasks", JSON.stringify(todo));
    }, [todo]);

    const inputRef = useRef();

    const handle_add_task = () => {
        const text = inputRef.current.value;
        if (!text.trim()) return;

        const item = { complated: false, text };

        settodo([...todo, item]);
        inputRef.current.value = "";
    };

    const handle_done_task = (index) => {
        const newtodo = [...todo];
        newtodo[index].complated = !newtodo[index].complated;
        settodo(newtodo);
    };

    const handle_delet_task = (index) => {
        const newtodo = [...todo];
        newtodo.splice(index, 1);
        settodo(newtodo);
    };

    return (
        <>
            <h2>TO DO LIST</h2>

            <ul>
                {todo.map(({ text, complated }, index) => {
                    return (
                        <li key={index}>
                            <div className={complated ? "done" : ""}>
                                {text}
                            </div>

                            <div className="small">
                                <span
                                    className="span-delet"
                                    onClick={() => handle_delet_task(index)}
                                >
                                    delet
                                </span>

                                <span
                                    className="span-done"
                                    onClick={() => handle_done_task(index)}
                                >
                                    done
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <input ref={inputRef} />
            <button onClick={handle_add_task}>add task</button>
        </>
    );
}

export default App;

