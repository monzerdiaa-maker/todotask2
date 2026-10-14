import { useRef, useState, useEffect } from "react";
import "./App.css";

const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
);

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
);

function App() {
    const [todo, settodo] = useState(() => {
        const savedtasks = localStorage.getItem("usertasks");

        return savedtasks ? JSON.parse(savedtasks) : [];
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        localStorage.setItem("usertasks", JSON.stringify(todo));
    }, [todo]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

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

            <button
                className="theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={
                    theme === "dark"
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                }
                title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

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
            <button className="add-btn" onClick={handle_add_task}>
                add task
            </button>
        </>
    );
}

export default App;