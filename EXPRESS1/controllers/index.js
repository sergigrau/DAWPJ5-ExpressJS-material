var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titol: 'Express 5.0' });
});

router.get('/suma', function(req, res, next) {
  res.render('suma', { titol: 'suma de 2 nombres' });
});

// Calcula la suma de dos nombres passats per query string (?n1=..&n2=..)
router.get('/calcularSuma', function(req, res, next) {
  var n1raw = req.query.n1;
  var n2raw = req.query.n2;
  var n1 = parseFloat(n1raw);
  var n2 = parseFloat(n2raw);
  if (isNaN(n1) || isNaN(n2)) {
    return res.render('suma', { titol: 'suma de 2 nombres', error: 'Introduïu dos nombres vàlids', n1: n1raw, n2: n2raw });
  }
  var resultat = n1 + n2;
  res.render('suma', { titol: 'suma de 2 nombres', resultat: resultat, n1: n1, n2: n2 });
});

module.exports = router;
