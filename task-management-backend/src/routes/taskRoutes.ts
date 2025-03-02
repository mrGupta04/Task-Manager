import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();


router.get("/gettask", getTasks);
router.post("/createtask", createTask);
router.put("/update/:id", updateTask);

router.delete("/delete/:id",deleteTask);

export default router;