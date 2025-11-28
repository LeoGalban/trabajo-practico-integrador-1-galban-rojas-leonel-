import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleTag = sequelize.define(
  "ArticleTag",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "articles_tags",
    timestamps: true,
    underscored: true,
  }
);
