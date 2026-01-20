import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { TasksContext, type TaskType } from "./contexts/TaskContext";
import { v4 as uuid } from "uuid";
import { SnackbarContext } from "./contexts/SncackbarContext";

export default function TodoList() {
  const [alignment, setAlignment] = useState("الكل");
  const [input, setInput] = useState("");
  const context = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [taskDialog, setTaskDialog] = useState<TaskType | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    details: "",
  });
  const snackbar = useContext(SnackbarContext);
  if (!snackbar) {
    throw new Error(
      "SnackbarContext must be used within SnackbarContext.Provider",
    );
  }
  if (!context) {
    throw new Error("TasksContext must be used within a TasksContext.Provider");
  }

  const { tasks, setTask } = context;

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTask(storageTasks);
  }, []);

  // delete dialog
  function handleClickOpen(task: TaskType) {
    setTaskDialog(task);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  function handelDelete() {
    const updated = tasks.filter((t) => {
      if (t.id == taskDialog?.id) {
        return false;
      }
      return true;
    });
    setTask(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    handleClose();
  
      snackbar?.showHideSnackbar("تم تاحذف بنجاح");
    
  }
  //edit dialog
  function handleClickOpenEdit(task: TaskType) {
    setOpenEdit(true);
    setTaskDialog(task);
    setEditForm({
      title: task.title,
      details: task.details,
    });
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handledit = () => {
    if (!taskDialog || !editForm) return;

    const updated = tasks.map((t) =>
      t.id === taskDialog.id
        ? { ...t, title: editForm.title, details: editForm.details }
        : t,
    );

    setTask(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    handleCloseEdit();
     snackbar?.showHideSnackbar("تم التعديل بنجاح");
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  ///
  const taskList = tasks.map((t) => {
    if (alignment == "غير منجز") {
      if (t.status == false) {
        return (
          <Task
            key={t.id}
            task={t}
            handleClickOpen={handleClickOpen}
            openEdit={handleClickOpenEdit}
          />
        );
      }
    }
    if (alignment == "منجز") {
      if (t.status == true) {
        return (
          <Task
            key={t.id}
            task={t}
            handleClickOpen={handleClickOpen}
            openEdit={handleClickOpenEdit}
          />
        );
      }
    }
    if (alignment == "الكل") {
      return (
        <Task
          key={t.id}
          task={t}
          handleClickOpen={handleClickOpen}
          openEdit={handleClickOpenEdit}
        />
      );
    }
  });
  return (
    <>
      {/* start edit dialog */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">أدخل التعديلات</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ padding: "20px" }}
          >
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              sx={{ width: "100%", marginBottom: "10px" }}
              //  onChange={handleInputChange}
              value={editForm.title}
              onChange={(e) => {
                setEditForm({ ...editForm, title: e.target.value });
              }}
            />
            <TextField
              id="outlined-basic"
              label="تفاصيل المهمة"
              variant="outlined"
              sx={{ width: "100%" }}
              value={editForm.details}
              onChange={(e) => {
                setEditForm({ ...editForm, details: e.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>إغلاق</Button>
          <Button onClick={handledit} autoFocus>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/* end edit dialog */}

      {/* start delete dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متاكد من عملية الحذف , اذا ضفطت نعم ستحذف المهمة نهائيا
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button onClick={handelDelete} autoFocus className="deleteButton">
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/* end delete dialog */}
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
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              مهامي
            </Typography>
            <Divider sx={{ marginTop: "-10px" }} />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{
                justifyContent: "center",
                width: "100%",
                marginTop: "10px",
              }}
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

                    snackbar.showHideSnackbar("تمت الاضافة بنجاح");
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
    </>
  );
}
