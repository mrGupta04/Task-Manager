"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    mobile_number: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    profile_pic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
exports.default = User;
