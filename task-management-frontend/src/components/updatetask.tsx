import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateTask } from "../services/taskServices";
import "../styles/updatetask.css";

const UpdateTask: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;

  const [updatedTask, setUpdatedTask] = useState(task);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTask(updatedTask.id, updatedTask);
      navigate("/"); // Redirect back to the task list
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="update-task-container">
      <h2 className="update-task-title">Update Task</h2>
      <form className="update-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="update-task-input"
          required
        />
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="update-task-textarea"
          required
        />
        <input
          type="date"
          name="due_date"
          value={updatedTask.due_date}
          onChange={handleChange}
          className="update-task-input"
          required
        />
        <select
          name="status"
          value={updatedTask.status}
          onChange={handleChange}
          className="update-task-select"
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="update-task-buttons">
          <button type="submit" className="update-task-button">
            Update Task
          </button>
          <button
            type="button"
            className="update-task-button cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;