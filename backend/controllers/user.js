export const getUserProfile = (req, res) => {
  res.status(201).json({
    success: true,
    user: req.user,
  });
};
