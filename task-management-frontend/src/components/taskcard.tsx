import React from "react";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../services/taskServices";
import "../styles/taskcard.css";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "in-progress" | "done";
}

interface TaskCardProps {
  task: Task;
  onDone: (updatedTask: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDone, onDelete }) => {
  const navigate = useNavigate();

  const handleDone = async () => {
    try {
      const updatedTask = { ...task, status: "done" as const };
      await updateTask(task.id, updatedTask);
      onDone(updatedTask);
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to mark task as done.");
    }
  };

  const handleUpdate = () => {
    navigate(`/update-task/${task.id}`, { state: { task } }); // Navigate with task data
  };

  const handleView = () => {
    navigate(`/view-task/${task.id}`, { state: { task } }); // Navigate to view task with task data
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent redirection if a button is clicked
    if ((e.target as HTMLElement).closest(".task-card-button")) {
      return;
    }
    handleView(); // Redirect to view task page
  };

  return (
    <div className="task-card-container" onClick={handleCardClick}>
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-description">{task.description}</p>
      <p className="task-card-due-date"><strong>Due Date:</strong> {task.due_date}</p>
      <p className="task-card-status"><strong>Status:</strong> {task.status}</p>

      <div className="task-card-actions">
        <button className="task-card-button task-card-button-update" onClick={handleUpdate}>
          Update
        </button>
        {task.status !== "done" && (
          <button className="task-card-button task-card-button-done" onClick={handleDone}>
            Done
          </button>
        )}
        <button className="task-card-button task-card-button-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;