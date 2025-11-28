import { Article } from "../models/Article.js";
import { Tag } from "../models/Tag.js";
import { ArticleTag } from "../models/ArticleTag.js";
import { User } from "../models/User.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, status } = req.body;

    const article = await Article.create({
      title,
      content,
      excerpt,
      status,
      userId: req.user.id,
    });

    return res.status(201).json({ message: "Artículo creado", article });
  } catch (error) {
    console.error("Error en createArticle:", error.message);
    return res.status(500).json({ message: "Error al crear artículo" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: "published" },
      include: [
        { model: User, as: "author" },
        { model: Tag, as: "tags" },
      ],
    });

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Error en getArticles:", error.message);
    return res.status(500).json({ message: "Error al obtener artículos" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id, {
      include: [
        { model: User, as: "author" },
        { model: Tag, as: "tags" },
      ],
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error("Error en getArticleById:", error.message);
    return res.status(500).json({ message: "Error al obtener artículo" });
  }
};

export const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { userId: req.user.id, status: "published" },
      include: [{ model: Tag, as: "tags" }],
    });

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Error en getMyArticles:", error.message);
    return res.status(500).json({ message: "Error al obtener tus artículos" });
  }
};

export const getMyArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findOne({
      where: { id, userId: req.user.id },
      include: [{ model: Tag, as: "tags" }],
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado o no pertenece al usuario" });
    }

    return res.status(200).json(article);
  } catch (error) {
    console.error("Error en getMyArticleById:", error.message);
    return res.status(500).json({ message: "Error al obtener artículo del usuario" });
  }
};

export const updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, status } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    if (title) article.title = title;
    if (content) article.content = content;
    if (excerpt) article.excerpt = excerpt;
    if (status) article.status = status;

    await article.save();

    return res.status(200).json({ message: "Artículo actualizado", article });
  } catch (error) {
    console.error("Error en updateArticleById:", error.message);
    return res.status(500).json({ message: "Error al actualizar artículo" });
  }
};

export const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    await article.destroy();

    await ArticleTag.destroy({ where: { articleId: id } });

    return res.status(200).json({ message: "Artículo eliminado lógicamente" });
  } catch (error) {
    console.error("Error en deleteArticleById:", error.message);
    return res.status(500).json({ message: "Error al eliminar artículo" });
  }
};
