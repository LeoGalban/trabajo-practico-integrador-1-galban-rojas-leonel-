import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 30],
      },
    },
  },
  {
    tableName: "tags",
    timestamps: true,
    underscored: true,
  }
);
