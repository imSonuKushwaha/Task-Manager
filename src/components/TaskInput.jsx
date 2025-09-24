import React, { useState, useCallback } from "react";
import { useTasks } from "../context/TaskContext";

const TaskInput = React.memo(() => {
  const [value, setValue] = useState("");
  const { addTask } = useTasks();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value.trim()) return; // validation: no empty
      addTask(value);
      setValue("");
    },
    [value, addTask]
  );

  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-center mb-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-gray-100"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg text-white transition"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        Add
      </button>
    </form>
  );
});

export default TaskInput;
