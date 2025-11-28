import { Article } from "../models/Article.js";
import { Tag } from "../models/Tag.js";
import { ArticleTag } from "../models/ArticleTag.js";

export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.body;

    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    const exists = await ArticleTag.findOne({ where: { articleId, tagId } });
    if (exists) {
      return res
        .status(400)
        .json({ message: "La etiqueta ya está asociada al artículo" });
    }

    const articleTag = await ArticleTag.create({ articleId, tagId });

    return res
      .status(201)
      .json({ message: "Etiqueta agregada al artículo", articleTag });
  } catch (error) {
    console.error("Error en addTagToArticle:", error.message);
    return res.status(500).json({ message: "Error al agregar etiqueta al artículo" });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleTagId } = req.params;

    const articleTag = await ArticleTag.findByPk(articleTagId);

    if (!articleTag) {
      return res.status(404).json({ message: "Relación artículo-etiqueta no encontrada" });
    }

    await articleTag.destroy();

    return res
      .status(200)
      .json({ message: "Etiqueta eliminada del artículo correctamente" });
  } catch (error) {
    console.error("Error en removeTagFromArticle:", error.message);
    return res.status(500).json({ message: "Error al eliminar etiqueta del artículo" });
  }
};
