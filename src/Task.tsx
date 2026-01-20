import { Check, Delete, Edit } from "@mui/icons-material";
import { CardContent, IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { TasksContext, type TaskType } from "./contexts/TaskContext";
import { useContext } from "react";
import { SnackbarContext } from "./contexts/SncackbarContext";

interface TaskProps {
  task: TaskType;
  handleClickOpen: (task: TaskType) => void;
  openEdit: (task: TaskType) => void;
}

export default function Task({ task, handleClickOpen, openEdit }: TaskProps) {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("TasksContext must be used within a TasksContext.Provider");
  }
  const { tasks, setTask } = context;
  const snackbar = useContext(SnackbarContext);
  function handelCheck() {
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, status: !t.status } : t,
    );
    setTask(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    snackbar?.showHideSnackbar("تم التعديل بنجاح");
  }

  const handelOpenDelete = () => {
    handleClickOpen(task);
  };
  // edit
  const handleClickOpenEdit = () => {
    openEdit(task);
  };

  return (
    <>
      <Card sx={{ minWidth: 100, margin: "15px 0 15px" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            backgroundColor: "#283593",

            color: "white",
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Typography variant="h4">{task.title}</Typography>
            <Typography variant="h6">{task.details}</Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "30%",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handelCheck}
              className="iconButton"
              sx={{
                color: task.status ? "white" : "green",
                backgroundColor: task.status ? "green" : "white",
                border: "1px green solid",
              }}
            >
              <Check />
            </IconButton>
            <IconButton
              className="iconButton"
              onClick={handelOpenDelete}
              sx={{
                color: "red",
                backgroundColor: "white",
                border: "1px red solid",
              }}
            >
              <Delete />
            </IconButton>
            <IconButton
              className="iconButton"
              onClick={handleClickOpenEdit}
              sx={{
                color: "blue",
                backgroundColor: "white",
                border: "1px blue solid",
              }}
            >
              <Edit />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
