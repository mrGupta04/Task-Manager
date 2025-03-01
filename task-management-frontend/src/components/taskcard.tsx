import React from "react";

interface TaskProps {
  task: {
    id: number;
    title: string;
    description: string;
  };
  onUpdate: (id: number) => void;
  onDone: (id: number) => void;
  onModify: (id: number) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, onUpdate, onDone, onModify }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-buttons">
        <button className="update-btn" onClick={() => onUpdate(task.id)}>Update</button>
        <button className="done-btn" onClick={() => onDone(task.id)}>Done</button>
        <button className="modify-btn" onClick={() => onModify(task.id)}>Modify</button>
      </div>
    </div>
  );
};

export default TaskCard;
