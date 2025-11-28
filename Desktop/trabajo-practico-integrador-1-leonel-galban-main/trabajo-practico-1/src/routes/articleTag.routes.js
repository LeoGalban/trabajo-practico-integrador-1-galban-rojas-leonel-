import { Router } from "express";
import { body, param } from "express-validator";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articleTag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { Article } from "../models/Article.js";
import { ArticleTag } from "../models/ArticleTag.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  [
    body("articleId").isInt().withMessage("articleId debe ser entero"),
    body("tagId").isInt().withMessage("tagId debe ser entero"),
  ],
  validatorMiddleware,
  ownerMiddleware((req) => Article.findByPk(req.body.articleId)),
  addTagToArticle
);

router.delete(
  "/:articleTagId",
  authMiddleware,
  [param("articleTagId").isInt().withMessage("ID inválido")],
  validatorMiddleware,
  removeTagFromArticle
);

export default router;
