import React, { useMemo, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, filter, reorderTasks } = useTasks();

  const filtered = useMemo(() => {
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const newList = Array.from(tasks);
      const [moved] = newList.splice(result.source.index, 1);
      newList.splice(result.destination.index, 0, moved);
      reorderTasks(newList);
    },
    [tasks, reorderTasks]
  );

  return (
    <div className="mt-2">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {filtered.length === 0 && (
                <li className="text-center text-gray-500 py-6">No tasks</li>
              )}
              {filtered.map((task, idx) => (
                <Draggable key={task.id} draggableId={task.id} index={idx}>
                  {(p, snapshot) => (
                    <li
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      className={`bg-gray-500 dark:bg-gray-700 rounded-lg p-3 shadow-sm transform ${
                        snapshot.isDragging ? "scale-105" : ""
                      }`}
                    >
                      <TaskItem task={task} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
