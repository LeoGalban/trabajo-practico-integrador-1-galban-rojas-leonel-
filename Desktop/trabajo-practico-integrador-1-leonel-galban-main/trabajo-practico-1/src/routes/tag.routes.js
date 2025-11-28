import { Router } from "express";
import { body, param } from "express-validator";
import {
  createTag,
  getTags,
  getTagById,
  updateTagById,
  deleteTagById,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  [
    body("name")
      .isLength({ min: 2, max: 30 })
      .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  ],
  validatorMiddleware,
  createTag
);

router.get("/", authMiddleware, getTags);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  [param("id").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  getTagById
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  [
    param("id").isInt().withMessage("ID inválido"),
    body("name")
      .optional()
      .isLength({ min: 2, max: 30 })
      .withMessage("El nombre debe tener entre 2 y 30 caracteres"),
  ],
  validatorMiddleware,
  updateTagById
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  [param("id").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  deleteTagById
);

export default router;
