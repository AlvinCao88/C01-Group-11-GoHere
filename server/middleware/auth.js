import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret-key", async (err) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
