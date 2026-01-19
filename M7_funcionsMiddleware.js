/*
 * Funcions Middleware amb Express.js.
 * Tenen accés a l'objecte req, res i next, en el cicle peticio-resposta
 * Poden executar quasevol codi, fer canvis a req i res, tancar el cicle peticio-resposta i 
 * cridar a la seguent funció de la pila 
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 21.01.2016
 * format del document UTF-8
 *  
 * CHANGELOG
 * 21.01.2016
 * - Funcions Middleware amb Express.js.
 * 19.01.2026, actualització a Express 5.0.0
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */

var express = require('express');
var app = express();
/**
 * Exemples i explicacions de `next()` en middleware d'Express
 *
 * Regles bàsiques:
 * - `next()` continua la pila de middleware cap al següent middleware o route handler.
 * - Si un middleware envia una resposta (ex: `res.send()`), normalment NO crida `next()`.
 * - `next(err)` passa el control a un handler d'errors (middleware amb 4 arguments).
 * - `next('route')` dins d'un route-level middleware salta al següent route handler coincident.
 */

// Middleware específic per la ruta /usuari/:codi
app.use('/usuari/:codi', function (req, res, next) {
  console.log('1) middleware per /usuari/:codi — mètode:', req.method);
  // No enviem resposta aquí; cridem next() per continuar la cadena
  next();
});

// Middleware que afegeix la data de la petició a l'objecte req
var dataPeticio = function (req, res, next) {
  // Modifiquem req perquè handlers posteriors puguin utilitzar aquesta informació
  req.dataPeticio = Date.now();
  // IMPORTANT: sense cridar next() la següent funció no s'executarà
  next();
};

// Middleware de registre (logging)
var log = function (req, res, next) {
  console.log('2) peticio rebuda a', req.path);
  next();
};

app.use(dataPeticio);
app.use(log);

// Ruta d'exemple: la data afegida pel middleware està disponible aquí
app.get('/', function (req, res) {
  var resposta = 'Petició feta en: ' + new Date(req.dataPeticio);
  res.send(resposta);
});

// Exemple: middleware que envia una resposta i NO crida next() (tanca la cadena)
app.get('/end', function (req, res) {
  // Com que no cridem next(), cap middleware posterior s'executarà per aquesta ruta
  res.send('Resposta final — no es crida next()');
});

// Exemple asíncron: cal cridar next() dins del callback quan l'operació acaba
app.use('/async', function (req, res, next) {
  console.log('3) middleware asíncron: inici');
  setTimeout(function () {
    req.asyncDone = true; // marquem que l'operació asíncrona ha acabat
    console.log('3) middleware asíncron: acabat, cridem next()');
    next();
  }, 100);
});
app.get('/async', function (req, res) {
  res.send('Middleware asíncron completat: ' + !!req.asyncDone);
});

// Exemple de next('route'): dins d'un route handler podem saltar al següent route per la mateixa ruta
app.get('/skip', function (req, res, next) {
  if (req.query.skip) {
    // Si demanem skip en query, saltem al següent handler de la mateixa ruta
    return next('route');
  }
  // Altrament, continuem amb el següent handler d'aquestes mateixes signatures
  next();
}, function (req, res) {
  res.send("Handler normal de /skip — no s'ha fet skip");
});

// Segon handler per /skip: s'executarà només si abans es va fer next('route')
app.get('/skip', function (req, res) {
  res.send("Handler alternatiu de /skip — s'ha fet skip a aquesta ruta");
});

// Exemple de pipeline que genera un error i crida next(err)
app.get('/error', function (req, res, next) {
  var err = new Error("Exemple d'error generat intencionadament");
  // next(err) salta als handlers d'error (4 arguments)
  next(err);
});

// Handler d'errors: té 4 arguments i atrapa errors passats amb next(err)
app.use(function (err, req, res, next) {
  console.error("Handler d'errors detectat:", err.message);
  res.status(500).send("S'ha produït un error: " + err.message);
});

// Inici del servidor
app.listen(3000, function () {
  console.log('Servidor escoltant a http://localhost:3000');
});