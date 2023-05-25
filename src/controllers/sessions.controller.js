export const getCurrentSession = (req, res) => {
  if (!req.user) {
    res.status(400).json('Session expired');
    return;
  }
  const user = { ...req.user._doc };
  delete user.password;
  res.json(user);
};
