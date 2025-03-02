import React from "react";
import TaskCard from "./taskcard";
import { deleteTask, updateTask } from "../services/taskServices";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "in-progress" | "done";
}

interface Props {
  title: string;
  status: string;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TodoTask: React.FC<Props> = ({ title, status, tasks, setTasks }) => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleDone = async (updatedTask: Task) => {
    try {
      const doneTask = { ...updatedTask, status: "done" as const };
      await updateTask(updatedTask.id, doneTask);
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? doneTask : task)));
    } catch (error) {
      console.error("Error marking task as done:", error);
      alert("Failed to mark task as done.");
    }
  };

  return (
    <div className="task-column">
      <h2>{title}</h2>
      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => handleDeleteTask(task.id)}
            onDone={(updatedTask) => handleDone(updatedTask)}
          />
        ))
      )}
    </div>
  );
};

export default TodoTask;
