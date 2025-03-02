"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const task_1 = __importDefault(require("../models/task"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, status } = req.query; // Extract from query parameters
    if (!user_id) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }
    try {
        const whereCondition = { user_id: Number(user_id) }; // Ensure user_id is a number
        if (status) {
            whereCondition.status = status; // Apply status filter if provided
        }
        const tasks = yield task_1.default.findAll({ where: whereCondition });
        res.json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, due_date, user_id } = req.body;
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
        const task = yield task_1.default.create({ title, description, status, due_date, user_id });
        console.log("Task created successfully:", task);
        res.status(201).json(task);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    console.log("fdfjfjf s");
    const { title, description, status, due_date } = req.body;
    if (!id) {
        res.status(400).json({ message: 'Task ID is required' });
        return;
    }
    try {
        const task = yield task_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        // Update task fields if provided
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.due_date = due_date || task.due_date;
        yield task.save();
        res.json(task);
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
});
exports.updateTask = updateTask;
/**
 * Delete a task
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Task ID is required' });
        return;
    }
    try {
        const task = yield task_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        yield task.destroy();
        res.status(204).send(); // No content to send back
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});
exports.deleteTask = deleteTask;
