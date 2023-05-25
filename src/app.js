import express from 'express';
import { __dirname } from './utils.js';
import session from 'express-session';
import passport from 'passport';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import './passport/passportStrategies.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import './DAL/dbConfig.js';
import { MONGO_URI, PORT } from './config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import registerRouter from './routes/register.router.js';
import ProductManager from '../src/DAL/ProductManagerMongo.js';
import sessionsRouter from './routes/sessions.router.js';

const path = __dirname + '/products.json';
const productManager = new ProductManager(path);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Cookies
app.use(cookieParser('secretPass'));

//Mongo Sessions
app.use(
  session({
    store: new mongoStore({
      mongoUrl: MONGO_URI,
    }),
    secret: 'secretSession',
    cookie: {
      maxAge: 12000000,
    },
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);
app.use('/register', registerRouter);
app.use('/api/sessions', sessionsRouter);

app.get('/createCookie', (req, res) => {
  res.cookie('cookie2', 'Second Cookie').send('Cookie added');
});

app.get('/readCookie', (req, res) => {
  const { cookie1, cookie2 } = req.cookies;
  res.json({ message: 'Cookies', cookie1, cookie2 });
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('cookie1').send('Cookie deleted');
});

app.get('/createCookieSigned', (req, res) => {
  res.cookie('cookieSigned1', 'First Cookie Signed', { signed: true }).send('Cookie signed');
});

app.get('/readCookieSigned', (req, res) => {
  const { cookieSigned1 } = req.signedCookies;
  res.json({ message: 'Cookies Signed', cookieSigned1 });
});

//Configuro el SocketServer
const httpServer = app.listen(PORT, () => console.log(`Listen in port ${PORT}`));

const messages = [];

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log(`Client conected id: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconected id: ${socket.id}`);
  });

  socket.on('addNewProduct', async (product) => {
    await productManager.createOne(product);
  });

  socket.on('deleteProduct', (id) => {
    console.log(`Product deleted ${id}`);
    productManager.deleteOne(id);
  });

  socket.on('message', (info) => {
    messages.push(info);
    socketServer.emit('chat', messages);
  });

  socket.on('newUser', (newUser) => {
    socket.broadcast.emit('broadcastChat', newUser);
    socketServer.emit('chat', messages);
  });
});
