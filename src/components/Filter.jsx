import React from "react";
import { useTasks } from "../context/TaskContext";

export default function Filter() {
  const { filter, setFilter, tasksCount, clearCompleted, markAllCompleted } =
    useTasks();

  return (
    <div className="flex items-center gap-2">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-2 py-2 rounded-md bg-gray-500 dark:bg-gray-700"
      >
        <option value="all">All ({tasksCount.total})</option>
        <option value="pending">Pending ({tasksCount.pending})</option>
        <option value="completed">Completed ({tasksCount.completed})</option>
      </select>
      <button
        onClick={clearCompleted}
        className="text-sm px-2 py-1 rounded-md border text-nowrap bg-gray-500 dark:bg-gray-700"
      >
        Clear ✅
      </button>
      <button
        onClick={markAllCompleted}
        className="text-sm px-2 py-1 rounded-md border text-nowrap bg-gray-500 dark:bg-gray-700"
      >
        Mark All ✅
      </button>
    </div>
  );
}
