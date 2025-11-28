import { Tag } from "../models/Tag.js";
import { Article } from "../models/Article.js";

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Tag.findOne({ where: { name } });

    if (exists) {
      return res.status(400).json({ message: "El nombre de la etiqueta ya existe" });
    }

    const tag = await Tag.create({ name });

    return res.status(201).json({ message: "Etiqueta creada", tag });
  } catch (error) {
    console.error("Error en createTag:", error.message);
    return res.status(500).json({ message: "Error al crear etiqueta" });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    console.error("Error en getTags:", error.message);
    return res.status(500).json({ message: "Error al obtener etiquetas" });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id, {
      include: [{ model: Article, as: "articles" }],
    });

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    return res.status(200).json(tag);
  } catch (error) {
    console.error("Error en getTagById:", error.message);
    return res.status(500).json({ message: "Error al obtener etiqueta" });
  }
};

export const updateTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrado" });
    }

    if (name) tag.name = name;

    await tag.save();

    return res.status(200).json({ message: "Etiqueta actualizada", tag });
  } catch (error) {
    console.error("Error en updateTagById:", error.message);
    return res.status(500).json({ message: "Error al actualizar etiqueta" });
  }
};

export const deleteTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Etiqueta no encontrada" });
    }

    await tag.destroy();

    return res.status(200).json({ message: "Etiqueta eliminada" });
  } catch (error) {
    console.error("Error en deleteTagById:", error.message);
    return res.status(500).json({ message: "Error al eliminar etiqueta" });
  }
};
