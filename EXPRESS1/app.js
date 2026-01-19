/**
 * Exercici amb middleware i rutes en Express
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 * date 19.01.2026
 * format del document UTF-8
 * CHANGELOG
 * 19.01.2026
 * - Actualització a Express 5.0.0
 */

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// const favicon = require('serve-favicon'); // descomenta si afegeixes public/favicon.ico

const indexController = require('./controllers/index');
const usuarisController = require('./controllers/usuaris');

const app = express();

app.set('views', path.join(__dirname, 'vistes'));
app.set('view engine', 'pug');


// Disable the X-Powered-By header per seguretat
app.disable('x-powered-by');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // activar si tens favicon
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexController);
app.use('/usuaris', usuarisController);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
