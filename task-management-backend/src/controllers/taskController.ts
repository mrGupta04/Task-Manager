import { Request, Response } from 'express';
import Task from '../models/task';



export const getTasks = async (req: Request, res: Response): Promise<void> => {
    

    const { user_id, status } = req.query; // Extract from query parameters

    if (!user_id) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }

    try {
        const whereCondition: any = { user_id: Number(user_id) }; // Ensure user_id is a number

        if (status) {
            whereCondition.status = status; // Apply status filter if provided
        }

        const tasks = await Task.findAll({ where: whereCondition });

        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status,due_date ,user_id} = req.body;
   // Ensure req.user is populated by your authentication middleware
   console.log("hi");
   console.log(title);
   console.log(description);
   console.log(status);
   console.log(due_date);
   console.log(user_id);
  // Validate required fields
  if (!user_id) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  if (!title || !description || !due_date) {
    res.status(400).json({ message: 'Title, description, and due date are required' });
    return;
  }

  try {
    // Create the task in the database
    const task = await Task.create({ title, description,status, due_date, user_id });
    console.log("Task created successfully:", task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

 
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    console.log(id);
    console.log("fdfjfjf s");
    const { title, description, status, due_date } = req.body;

    if (!id) {
        res.status(400).json({ message: 'Task ID is required' });
        return;
    }

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Update task fields if provided
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.due_date = due_date || task.due_date;

        await task.save();
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

/**
 * Delete a task
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: 'Task ID is required' });
        return;
    }

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        await task.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};