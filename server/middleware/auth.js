import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await jwt.verify(token, "secret-key", async (err, decoded) => {
          if (err) {
            return res.status(401).send("Unauthorized");
          }
        });
        
        next()
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}