/*
 * Utilització de parametres amb ExpressJS
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 14.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 14.01.2016
 * - Utilització de paràmetres
 * 19.01.2026, actualització a Express 5.0.0
* NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */
var express = require('express');
var app = express();
app.use(express.static('public'));

//http://localhost:3000/usuari/3
app.get('/usuari/:id', function(req, res) {
  res.send('usuari ' + req.params.id);
});

//http://localhost:3000/suma/3/2
app.get('/suma/:n1/:n2', function(req, res) {
  res.send('la suma és ' + (req.params.n1*1 + req.params.n2*1));
});

app.listen(3000, function () {
  console.log('Servidor escoltant port 3000');
})

// qualsevol altre petició retorna 404 not found
//req i res són els mateixos objectes de NodeJS