"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
router.get("/gettask", taskController_1.getTasks);
router.post("/createtask", taskController_1.createTask);
router.put("/update/:id", taskController_1.updateTask);
router.delete("/delete/:id", taskController_1.deleteTask);
exports.default = router;
