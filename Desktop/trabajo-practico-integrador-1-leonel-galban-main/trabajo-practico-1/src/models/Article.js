import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [3, 200],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [50],
      },
    },
    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      allowNull: false,
      defaultValue: "published",
    },
  },
  {
    tableName: "articles",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
