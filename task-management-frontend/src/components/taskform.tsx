import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../services/taskServices";
import "../styles/taskform.css";

interface Task {
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "in-progress" | "done";
  user_id?: number;
}

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
    user_id: undefined, // Initially undefined
  });

  // Extract user_id using useEffect
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      try {
        const user = JSON.parse(storedUser);
        if (user?.id) {
          setUserId(user.id);
        } else {
          console.error("User ID not found in localStorage.");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    fetchUserId();
  }, []);

  // Update task state when userId is retrieved
  useEffect(() => {
    if (userId) {
      setTask((prevTask) => ({ ...prevTask, user_id: userId }));
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.user_id) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      await addTask(task);
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Add Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          className="task-form-input"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="task-form-textarea"
          required
        />
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          className="task-form-input"
          required
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="task-form-select"
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="task-form-buttons">
          <button
            type="submit"
            className="task-form-button"
            disabled={!userId}
          >
            Add Task
          </button>
          <button
            type="button"
            className="task-form-button cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;