import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { nanoid } from "nanoid";

const TaskContext = createContext(null);

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("tasks_filter", "all");
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const addTask = useCallback(
    (text) => {
      const t = { id: nanoid(), text: text.trim(), completed: false };
      setStoredTasks((prev) => [t, ...prev]);
    },
    [setStoredTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setStoredTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [setStoredTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setStoredTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setStoredTasks]
  );

  const reorderTasks = useCallback(
    (newTasks) => {
      setStoredTasks(newTasks);
    },
    [setStoredTasks]
  );

  const clearCompleted = useCallback(() => {
    setStoredTasks((prev) => prev.filter((t) => !t.completed));
  }, [setStoredTasks]);

  const markAllCompleted = useCallback(() => {
    setStoredTasks((prev) => prev.map((t) => ({ ...t, completed: true })));
  }, [setStoredTasks]);

  const tasksCount = useMemo(
    () => ({
      total: storedTasks.length,
      completed: storedTasks.filter((t) => t.completed).length,
      pending: storedTasks.filter((t) => !t.completed).length,
    }),
    [storedTasks]
  );

  const value = useMemo(
    () => ({
      tasks: storedTasks,
      addTask,
      toggleTask,
      deleteTask,
      reorderTasks,
      filter,
      setFilter,
      clearCompleted,
      markAllCompleted,
      tasksCount,
      theme,
      setTheme,
    }),
    [
      storedTasks,
      addTask,
      toggleTask,
      deleteTask,
      reorderTasks,
      filter,
      setFilter,
      clearCompleted,
      markAllCompleted,
      tasksCount,
      theme,
      setTheme,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
