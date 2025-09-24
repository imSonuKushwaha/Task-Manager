import React from "react";
import { useTasks } from "../context/TaskContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTasks();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className=" bg-gray-500 dark:bg-gray-700"
    >
      {theme === "light" ? "🌞" : "🌜"}
    </button>
  );
}
