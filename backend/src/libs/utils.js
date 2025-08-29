import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None for cross-site cookies in production
    secure: process.env.NODE_ENV === "production", // Only use secure in production
    path: "/", // Ensure cookie is available for all paths
  });

  return token;
};