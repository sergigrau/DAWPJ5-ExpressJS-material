/*
 * Utilització de la querystring amb ExpressJS
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 14.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 14.01.2016
 * - Utilització de querystrings
 * 19.01.2026, actualització a Express 5.0.0
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */
var express = require('express');
var app = express();

//http://localhost:3000/comprar?usuari=sergi
app.get('/comprar', function(req, res) {
  res.send('usuari ' + req.query.usuari);
});

//http://localhost:3000/comprarCamisa?camisa[mida]=XL
app.get('/comprarCamisa', function(req, res) {
  res.send('mida ' + req.query.camisa.mida);
});

app.listen(3000, function () {
  console.log('Servidor escoltant port 3000');
})

// qualsevol altre petició retorna 404 not found
//req i res són els mateixos objectes de NodeJS