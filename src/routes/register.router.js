import { Router } from 'express';
import passport from 'passport';

import {
  currentSession,
  errorLogin,
  errorRegister,
  githubAuthenticate,
  login,
  passportLogin,
  passportLogout,
  passportRegister,
  register,
} from '../controllers/users.controller.js';
import { recover, recoverPage } from '../controllers/recovery.controller.js';

const router = Router();

router.get('/', register);
router.get('/login', login);
router.get('/errorRegister', errorRegister);
router.get('/errorLogin', errorLogin);
router.get('/recoverPage', recoverPage);

//Passport
router.post('/', passport.authenticate('register', { failureRedirect: '/register/errorRegister' }), passportRegister);
router.post('/login', passport.authenticate('login', { failureRedirect: '/register/errorLogin' }), passportLogin);
router.post('/logout', passportLogout);

//Github
router.get(
  '/signupGithub',
  passport.authenticate('github', {
    scope: ['user:email'],
    failureRedirect: '/register/errorRegister',
  })
);
router.get('/github', passport.authenticate('github', { failureRedirect: '/register/errorLogin' }), githubAuthenticate);

router.get('/current', currentSession);

//Recover password
router.post('/recover', recover);

export default router;
