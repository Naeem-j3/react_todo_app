import { createContext, useContext, useState } from "react";
import Snackbar from "../Snackbar";
export interface SnackbarContextType {
  showHideSnackbar: (message:string) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  function showHideSnackbar(message:string) {
    setOpen(true);
    setMessage(message)
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (<SnackbarContext.Provider value={{ showHideSnackbar }}>
    <Snackbar open={open} message={message}/>
    {children}
    </SnackbarContext.Provider>)
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}