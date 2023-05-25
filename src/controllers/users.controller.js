export const register = (req, res) => {
  res.render('register');
};

export const login = (req, res) => {
  res.render('login');
};

export const errorRegister = (req, res) => {
  res.render('errorRegister');
};

export const errorLogin = (req, res) => {
  res.render('errorLogin');
};

//Passport
export const passportRegister = (req, res) => {
  res.redirect('/register/login');
};

export const passportLogin = (req, res) => {
  res.redirect(`/views/realtimeproducts`);
};

export const passportLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/register/login');
  });
};

//Github
export const githubAuthenticate = (req, res) => {
  res.redirect('/views/realtimeproducts');
};

export const currentSession = (req, res) => {
  if (!req.user) {
    res.status(400).json('Session expired');
    return;
  }
  const user = { ...req.user._doc };
  delete user.password;
  res.json(user);
};
