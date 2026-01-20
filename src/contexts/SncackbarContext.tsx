import { createContext } from "react";

export interface SnackbarContextType {
  showHideSnackbar: (message:string) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
