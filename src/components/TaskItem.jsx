import React, { useCallback } from "react";
import { useTasks } from "../context/TaskContext";

const TaskItem = React.memo(({ task }) => {
  const { toggleTask, deleteTask } = useTasks();

  const onToggle = useCallback(
    () => toggleTask(task.id),
    [toggleTask, task.id]
  );
  const onDelete = useCallback(
    () => deleteTask(task.id),
    [deleteTask, task.id]
  );

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
            task.completed ? "bg-green-500 text-white" : "bg-white"
          }`}
        >
          {task.completed ? "✓" : ""}
        </button>
        <span
          className={`${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {task.text}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="text-red-500"
          style={{ backgroundColor: "#1a1a1a", padding: "6px 12px" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
