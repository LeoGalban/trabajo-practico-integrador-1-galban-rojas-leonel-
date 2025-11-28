import { Router } from "express";
import { body, param } from "express-validator";
import {
  createArticle,
  getArticles,
  getArticleById,
  getMyArticles,
  getMyArticleById,
  updateArticleById,
  deleteArticleById,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { Article } from "../models/Article.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  [
    body("title")
      .isLength({ min: 3, max: 200 })
      .withMessage("El título debe tener entre 3 y 200 caracteres"),
    body("content")
      .isLength({ min: 50 })
      .withMessage("El contenido debe tener al menos 50 caracteres"),
  ],
  validatorMiddleware,
  createArticle
);

router.get("/", authMiddleware, getArticles);

router.get("/user", authMiddleware, getMyArticles);

router.get(
  "/user/:id",
  authMiddleware,
  [param("id").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  getMyArticleById
);

router.get(
  "/:id",
  authMiddleware,
  [param("id").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  getArticleById
);

router.put(
  "/:id",
  authMiddleware,
  [param("id").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  ownerMiddleware((req) => Article.findByPk(req.params.id)),
  updateArticleById
);

router.delete(
  "/:id",
  authMiddleware,
  [param("id").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  ownerMiddleware((req) => Article.findByPk(req.params.id)),
  deleteArticleById
);

export default router;
