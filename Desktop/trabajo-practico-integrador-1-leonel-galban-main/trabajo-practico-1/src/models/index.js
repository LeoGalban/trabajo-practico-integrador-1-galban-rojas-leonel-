import { User } from "./User.js";
import { Profile } from "./Profile.js";
import { Article } from "./Article.js";
import { Tag } from "./Tag.js";
import { ArticleTag } from "./ArticleTag.js";

User.hasOne(Profile, {
  as: "profile",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Profile.belongsTo(User, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
});

User.hasMany(Article, {
  as: "articles",
  foreignKey: { name: "userId", allowNull: false },
});
Article.belongsTo(User, {
  as: "author",
  foreignKey: { name: "userId", allowNull: false },
});

Article.belongsToMany(Tag, {
  through: ArticleTag,
  as: "tags",
  foreignKey: "articleId",
  otherKey: "tagId",
});
Tag.belongsToMany(Article, {
  through: ArticleTag,
  as: "articles",
  foreignKey: "tagId",
  otherKey: "articleId",
});

export { User, Profile, Article, Tag, ArticleTag };
