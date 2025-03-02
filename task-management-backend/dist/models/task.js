"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const user_1 = __importDefault(require("./user"));
class Task extends sequelize_1.Model {
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    due_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id',
        },
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false,
});
user_1.default.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(user_1.default, { foreignKey: 'user_id' });
exports.default = Task;
