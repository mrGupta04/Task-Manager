import React, { useEffect, useState } from "react";
import TodoTask from "../components/task";
import TaskForm from "../components/taskform"; // Import TaskForm
import { getTasks } from "../services/taskServices";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: "pending" | "in-progress" | "done";
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userData) return;
      try {
        const fetchedTasks = await getTasks(userData.id);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please try again.");
      }
    };
    fetchTasks();
  }, [userData]);

  const handleNavigateToTaskForm = () => {
    if (userData) {
      navigate("/add-task");
    } else {
      alert("You need to log in first!"); 
    navigate("/profile");
    }
  };

  return (
    <div className="dashboard-container">
      <button className="dashboard__add-task-button" onClick={handleNavigateToTaskForm}>
        Add New Task
      </button>
      <div className="dashboard__tasks-grid">
        <TodoTask
          title="Pending"
          status="pending"
          tasks={tasks.filter((task) => task.status === "pending")}
          setTasks={setTasks}
        />
        <TodoTask
          title="In Progress"
          status="in-progress"
          tasks={tasks.filter((task) => task.status === "in-progress")}
          setTasks={setTasks}
        />
        <TodoTask
          title="Done"
          status="done"
          tasks={tasks.filter((task) => task.status === "done")}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
};

export default Dashboard;