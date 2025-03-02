import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/viewtask.css";

const ViewTask: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  if (!task) {
    return <div className="view-task-not-found">Task not found</div>;
  }

  const handleBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="view-task-card">
      <h1 className="view-task-title">{task.title}</h1>
      <p className="view-task-description">{task.description}</p>
      <div className="view-task-meta">
        <p className="view-task-due-date">
          <strong>Due Date:</strong> {task.due_date}
        </p>
        <p className="view-task-status">
          <strong>Status:</strong> {task.status}
        </p>
      </div>
      <button className="view-task-back-button" onClick={handleBack}>
        Back to Home
      </button>
    </div>
  );
};

export default ViewTask;