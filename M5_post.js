/*
 * Tractament d'un POST amb  ExpressJS
 * @author sergi grau, sergi.grau@fje.edu
 * @version 1.0
 * date 21.01.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 21.01.2016
 * - Tractament d'un POST amb  ExpressJS
 * - Instal·lar body-parser per tractar JSON, URLencoder i dades
 * - npm install body-parser, https://www.npmjs.com/package/body-parser
 * 19.01.2026, actualització a Express 5.0.0
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// creem una aplicació del tipus application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use(express.static('public'));

//app.post(path, callback [, callback ...])
app.post('/processar', urlencodedParser, function (req, res) {

    // generem una sortida en format JSON
    respostaJSON = {
        nom: req.body.nom,
        cognom: req.body.cognom
    };
    console.log(respostaJSON);
    res.end(JSON.stringify(respostaJSON));
})

var servidor = app.listen(3000, function () {
    var host = servidor.address().address
    var port = servidor.address().port
    console.log("Escoltant en http://%s:%s", host, port)
});