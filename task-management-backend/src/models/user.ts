import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public mobile_number!: string;
    public password_hash!: string;
    public profile_pic!: string | null;
    public created_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        mobile_number: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    }
);

export default User;
