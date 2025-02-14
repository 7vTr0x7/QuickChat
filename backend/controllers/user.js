export const getUserProfile = () => {
  res.status(201).json({
    success: true,
    user: req.user,
  });
};
