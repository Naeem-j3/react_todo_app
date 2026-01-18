import { Check, Delete, Edit} from "@mui/icons-material";
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useContext, useState } from "react";
import { TasksContext } from "./contexts/TaskContext";
interface TaskProps {
  task: {
    id: string;
    title: string;
    details: string;
    status: boolean;
  };
}

export default function Task({ task }: TaskProps) {
 const context = useContext(TasksContext);
if (!context) {
  throw new Error("TasksContext must be used within a TasksContext.Provider");
}
const { tasks, setTask } = context;

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    details: task.details,
  });
  function handelCheck() {
    const updated = tasks.map((t) => {
      if (t.id == task.id) {
        t.status = !task.status;
      }
      return t;
    });
    setTask(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  function handelDelete() {
    const updated = tasks.filter((t) => {
      if (t.id == task.id) {
        return false;
      }
      return true;
    });
    setTask(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // edit
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditForm({
      title: task.title,
      details: task.details,
    });
  };
  const handledit = () => {
    const updated = tasks.map((t) => {
      if (t.id == task.id) {
        task.title = editForm.title;
        task.details = editForm.details;
      }
      return t;
    });
    setTask(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    handleCloseEdit();
  };

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
              onClick={handleClickOpen}
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
