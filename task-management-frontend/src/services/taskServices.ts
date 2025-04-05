import axios from 'axios';

const API_URL = "https://task-manager-cjw8.onrender.com/api/tasks"; // Base URL for tasks



export const getTasks = async (userId: string, status?: string): Promise<any[]> => {
  try {


    const response = await axios.get(`${API_URL}/gettask`, {
      params: { user_id: userId, status }, // Send as query params
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};


// Add a new task to the backend
export const addTask = async (task: {
  title: string;
  description: string;
  due_date?: string;
  status: string;
  user_id?: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/createtask`, task, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Task created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,

  updatedTask: Partial<{ title: string; description: string; status?: string; due_date?: string }>
) => {
  console.log(id);
  console.log(updatedTask.title);
  console.log(updatedTask.status);
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedTask, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Task updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};


export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
