import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, biography, avatarUrl, birthDate } =
      req.body;

    const existingUsername = await User.findOne({ where: { username } });
    const existingEmail = await User.findOne({ where: { email } });

    if (existingUsername || existingEmail) {
      return res.status(400).json({ message: "Username o email ya están en uso" });
    }

    const hashed = await hashPassword(password);

    const user = await User.create(
      {
        username,
        email,
        password: hashed,
        role: "user",
        profile: {
          firstName,
          lastName,
          biography,
          avatarUrl,
          birthDate,
        },
      },
      {
        include: [{ model: Profile, as: "profile" }],
      }
    );

    const token = generateToken({ id: user.id, role: user.role });

    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en register:", error.message);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    let user = await User.findOne({ where: { username: usernameOrEmail } });
    if (!user) {
      user = await User.findOne({ where: { email: usernameOrEmail } });
    }

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.cookie(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error.message);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Profile, as: "profile" }],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
    });
  } catch (error) {
    console.error("Error en profile:", error.message);
    return res.status(500).json({ message: "Error al obtener perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, biography, avatarUrl, birthDate } = req.body;

    const user = await User.findByPk(req.user.id, {
      include: [{ model: Profile, as: "profile" }],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!user.profile) {
      await Profile.create({
        userId: user.id,
        firstName,
        lastName,
        biography,
        avatarUrl,
        birthDate,
      });
    } else {
      await user.profile.update({
        firstName,
        lastName,
        biography,
        avatarUrl,
        birthDate,
      });
    }

    const updated = await User.findByPk(req.user.id, {
      include: [{ model: Profile, as: "profile" }],
    });

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile: updated.profile,
    });
  } catch (error) {
    console.error("Error en updateProfile:", error.message);
    return res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie(process.env.COOKIE_NAME);
    return res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    console.error("Error en logout:", error.message);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
};
