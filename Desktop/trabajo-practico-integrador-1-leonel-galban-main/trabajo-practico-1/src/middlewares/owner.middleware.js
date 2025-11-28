export const ownerMiddleware = (getResource, ownerField = "userId") => {
  return async (req, res, next) => {
    try {
      const resource = await getResource(req);

      if (!resource) {
        return res.status(404).json({ message: "Recurso no encontrado" });
      }

      const isOwner = resource[ownerField] === req.user.id;
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: "No autorizado para esta operación" });
      }

      req.resource = resource;
      next();
    } catch (error) {
      console.error("Error en ownerMiddleware:", error.message);
      return res.status(500).json({ message: "Error interno de servidor" });
    }
  };
};
