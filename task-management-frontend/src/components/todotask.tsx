import React, { useEffect, useState } from "react";
import TaskCard from "./taskcard";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskServices";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TodoTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks with status "todo" from backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks("todo"); // Fetch tasks where status = "todo"
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async () => {
    const newTask = {
      title: "New Task",
      description: "Task description...",
    };

    const addedTask = await addTask(newTask);
    if (addedTask) {
      setTasks([...tasks, addedTask]);
    }
  };

  // Update task
  const handleUpdateTask = async (id: number) => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated task description",
    };

    await updateTask(id, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  // Delete task
  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-column">
      <div className="task-header">
        <h2>To Do</h2>
        <button onClick={handleAddTask}>+</button>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={handleUpdateTask}
          onDone={handleDeleteTask}
          onModify={handleUpdateTask}
        />
      ))}
    </div>
  );
};

export default TodoTask;
