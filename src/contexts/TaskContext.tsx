import { createContext } from "react";
export type TaskType = {
  id: string;
  title: string;
  details: string;
  status: boolean;
};
type TasksContextType = {
  tasks: TaskType[];
  setTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export const TasksContext = createContext<TasksContextType | null>(null);

