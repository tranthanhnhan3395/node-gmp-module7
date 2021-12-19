import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { API_MESSAGES } from "../shared/messages";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: API_MESSAGES.UNAUTHORIZED });
  }

  jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET as string,
    (err) => {
      if (err) {
        return res.status(403).json({ message: API_MESSAGES.TOKEN_INVALID });
      }

      next();
    }
  );
};

export default authenticateToken;
