import TodoList from "./TodoList";
import "./App.css";
import { TasksContext } from "./contexts/TaskContext";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import Snackbar from "./Snackbar";
import { SnackbarContext } from "./contexts/SncackbarContext";
function App() {
  const [tasks, setTask] = useState([
    {
      id: uuid(),
      title: "قراءة كتاب",
      details: "قراءة كتاب خلال 5دقائق",
      status: false,
    },
    {
      id: uuid(),
      title: "لعب رياضة ",
      details: " لعب رياضة  خلال 5دقائق",
      status: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  function showHideSnackbar(message:string) {
    setOpen(true);
    setMessage(message)
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (
    <TasksContext.Provider value={{ tasks, setTask }}>
      <SnackbarContext.Provider value={{ showHideSnackbar }}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#191b1f",
            margin: "0",
          }}
        >
          <TodoList />

          
        </div>
        <Snackbar open={open} message={message}/>
      </SnackbarContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
