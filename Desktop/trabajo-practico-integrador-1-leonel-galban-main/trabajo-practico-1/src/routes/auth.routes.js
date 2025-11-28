import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  profile,
  updateProfile,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username debe tener entre 3 y 20 caracteres")
      .isAlphanumeric()
      .withMessage("Username debe ser alfanumérico"),
    body("email").isEmail().withMessage("Email inválido"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("firstName")
      .isLength({ min: 2, max: 50 })
      .withMessage("Nombre debe tener entre 2 y 50 caracteres"),
    body("lastName")
      .isLength({ min: 2, max: 50 })
      .withMessage("Apellido debe tener entre 2 y 50 caracteres"),
  ],
  validatorMiddleware,
  register
);

router.post(
  "/login",
  [
    body("usernameOrEmail")
      .notEmpty()
      .withMessage("usernameOrEmail es obligatorio"),
    body("password").notEmpty().withMessage("password es obligatorio"),
  ],
  validatorMiddleware,
  login
);

router.get("/profile", authMiddleware, profile);

router.put(
  "/profile",
  authMiddleware,
  [
    body("firstName")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("Nombre debe tener entre 2 y 50 caracteres"),
    body("lastName")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("Apellido debe tener entre 2 y 50 caracteres"),
  ],
  validatorMiddleware,
  updateProfile
);

router.post("/logout", authMiddleware, logout);

export default router;
