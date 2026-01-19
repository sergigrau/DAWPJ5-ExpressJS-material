/*
 * FileUpload amb ExpressJS
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 21.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 21.01.2016
 * - FileUpload amb ExpressJS
 * - Instal·lar body-parser per tractar JSON, URLencoder i dades
 * - npm install body-parser, https://www.npmjs.com/package/body-parser
 * - Instal·lar multer per tractar multiparts
 * - npm install multer, https://www.npmjs.com/package/multer
 *  23.03.2017
 * - compatible amb Windows i correccions menors
 * - el fitxer es copia amb un altre nom, i cal canviar l'extensio per SO
 * 19.01.2026, actualització a Express 5.0.0
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */
var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
// Configure multer to store directly into public/uploads
var directoriPujada = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(directoriPujada)) {
  fs.mkdirSync(directoriPujada, { recursive: true });
}

var emmagatzematge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directoriPujada);
  },
  filename: function (req, file, cb) {
    var nomOriginal = path.basename(file.originalname || file.fieldname);
    var nomFinal = nomOriginal;
    var rutaDesti = path.join(directoriPujada, nomFinal);
    if (fs.existsSync(rutaDesti)) {
      var partsNom = path.parse(nomOriginal);
      nomFinal = partsNom.name + '-' + Date.now() + partsNom.ext;
    }
    cb(null, nomFinal);
  }
});

var puja = multer({ storage: emmagatzematge });

app.post('/file_upload', puja.single('file'), function (req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.json({
    missatge: 'fitxer pujat',
    fitxer: req.file.filename,
    ruta: path.join('uploads', req.file.filename)
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Escoltant en http://%s:%s", host, port)

})