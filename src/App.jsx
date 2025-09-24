import React, { useEffect } from "react";
import { useTasks } from "./context/TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const { theme } = useTasks();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4"
      style={{
        width: "100vw",
      }}
    >
      <div
        className="app-container"
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <header className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Task Manager
          </h1>
        </header>

        <div className="flex justify-between gap-3 mb-4">
          <Filter />
          <ThemeToggle />
        </div>

        <main className="bg-gray-300 dark:bg-gray-800 rounded-2xl shadow p-4">
          <TaskInput />
          <TaskList />
          <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-300">
            <span>Tip: drag tasks to reorder</span>
            <span>Built with ❤️</span>
          </div>
        </main>
      </div>
    </div>
  );
}
