import TodoList from "./TodoList";
import "./App.css";
import { TasksContext } from "./contexts/TaskContext";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import {SnackbarProvider } from "./contexts/SncackbarContext";
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

  return (
    <TasksContext.Provider value={{ tasks, setTask }}>
      <SnackbarProvider>
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
      </SnackbarProvider>
    </TasksContext.Provider>
  );
}

export default App;
