import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select('-password'); // fixed
    if (!user) {
      return res.status(401).json({ msg: "User not found, authorization denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {   // fixed
    return res.status(403).json({ msg: "Admin resources. Access denied" });
  }
  next();
};
