import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { Article } from "../models/Article.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" },
      ],
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error en getUsers:", error.message);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error en getUserById:", error.message);
    return res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, username, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (role) user.role = role;
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({ message: "Usuario actualizado", user });
  } catch (error) {
    console.error("Error en updateUserById:", error.message);
    return res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    return res.status(200).json({ message: "Usuario eliminado lógicamente" });
  } catch (error) {
    console.error("Error en deleteUserById:", error.message);
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
