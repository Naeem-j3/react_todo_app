import {
  Container,
  Divider,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Task from "./Task";
import { useContext } from "react";
import { TasksContext } from "./contexts/TaskContext";
import { v4 as uuid } from "uuid";
export default function TodoList() {
  const [alignment, setAlignment] = useState("الكل");
  const [input, setInput] = useState("");
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("TasksContext must be used within a TasksContext.Provider");
  }

  const { tasks, setTask } = context;

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTask(storageTasks);
  }, []);
  const taskList = tasks.map((t) => {
    if (alignment == "غير منجز") {
      if (t.status == false) {
        return <Task key={t.id} task={t} />;
      }
    }
    if (alignment == "منجز") {
      if (t.status == true) {
        return <Task key={t.id} task={t} />;
      }
    }
    if (alignment == "الكل") {
      return <Task key={t.id} task={t} />;
    }
  });

  function handleInputChange(e) {
    setInput(e.target.value);
  }
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: 275,
          maxHeight: "80vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          position: "relative",
        }}
      >
        <CardContent>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            مهامي
          </Typography>
          <Divider sx={{ marginTop: "-10px" }} />
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ justifyContent: "center", width: "100%", marginTop: "10px" }}
          >
            <ToggleButton value="غير منجز">غير منجز</ToggleButton>
            <ToggleButton value="منجز">منجز</ToggleButton>
            <ToggleButton value="الكل">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* list of task */}
          {taskList}
          {/* end list of task */}
          <Grid
            container
            spacing={2}
            sx={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "background.paper",
              p: 2,
            }}
          >
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ width: "100%", height: "100%", fontSize: "25px" }}
                onClick={() => {
                  setInput("");
                  setTask([
                    ...tasks,
                    { id: uuid(), title: input, details: "", status: false },
                  ]);
                  localStorage.setItem("tasks", JSON.stringify(tasks));
                }}
                disabled={input.length == 0}
              >
                إضافة
              </Button>
            </Grid>
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="إضافة مهمة"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleInputChange}
                value={input}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
