import UsersDB_DTO from '../DAL/DTOs/usersDB.dto.js';

export const getCurrentSession = (req, res) => {
  const userLogin = new UsersDB_DTO(req.user);
  if (!req.user) {
    res.status(400).json('Session expired');
    return;
  }
  res.json(userLogin);
};
