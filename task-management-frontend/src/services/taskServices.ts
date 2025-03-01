const API_URL = "http://localhost:5000/tasks"; // Replace with actual backend URL

export const getTasks = async (status?: string): Promise<any[]> => {
    try {
        const url = status ? `${API_URL}?status=${encodeURIComponent(status)}` : API_URL;
        
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};



export const addTask = async (task: { title: string; description: string; due_date?: string }) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Error adding task");
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding task:", error);
        return null;
    }
};

export const updateTask = async (id: number, updatedTask: Partial<{ title: string; description: string; status?: string; due_date?: string }>) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
            throw new Error("Error updating task");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating task:", error);
        return null;
    }
};

export const deleteTask = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error deleting task");
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
