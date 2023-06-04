import { ROLE_ADMIN, ROLE_USER } from '../DAL/mongoDB/models/users.model.js';

export const authUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).json('Session expired');
    return;
  }
  if (req.user.role === ROLE_USER) {
    next();
  } else {
    res.status(403).end();
  }
};

export const authAdmin = (req, res, next) => {
  if (!req.user) {
    res.status(401).json('Session expired');
    return;
  }
  if (req.user.role === ROLE_ADMIN) {
    next();
  } else {
    res.status(403).end();
  }
};
