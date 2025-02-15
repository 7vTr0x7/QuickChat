import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  if (user) {
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "Development",
      })
      .json({
        success: true,
        message,
        token,
      });
  }
};
