import { Request, Response } from 'express';
import Task from '../models/task';

/**
 * Get all tasks for the authenticated user
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    try {
        const tasks = await Task.findAll({ where: { user_id: userId } });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

/**
 * Create a new task
 */
export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, due_date } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }

    if (!title || !description || !due_date) {
        res.status(400).json({ message: 'Title, description, and due date are required' });
        return;
    }

    try {
        const task = await Task.create({ title, description, due_date, user_id: userId });
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

/**
 * Update an existing task
 */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
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