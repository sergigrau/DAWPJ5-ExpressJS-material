/* GET home page. */

var operacions=0;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.salutacio = function(req, res){
  res.render('salutacio', { titol: 'Hola Món!' });
};

exports.llistarAlumnes = function(db) {
    return function(req, res) {
        var collection = db.get('alumnes');
        collection.find({},{},function(e,docs){
        	console.log(docs);
            res.render('llistarAlumnes', {
                "llistarAlumnes" : docs,
                "operacions" : operacions,
            });
        });
    };
};

exports.afegirAlumne = function(req, res){
  res.render('afegirAlumne', { titol: 'Afegir un nou alumne' });
};


exports.afegirAlumneBD = function(db) {
    return function(req, res) {

        // recuperem les dades del formulari
        var nom = req.body.nom;
        var email = req.body.email;

        // obtenim la nostra col·lecció de dades
        var collection = db.get('alumnes');

        // desen a la BD
        collection.insert({
            "nom" : nom,
            "email" : email
        }, function (err, doc) {
            if (err) {
                
                res.send("problemes amb la base de dades.");
            }
            else {
            	operacions++;
                //canviem URL al navegador
                res.location("llistarAlumnes");
                //redireccionem
                res.redirect("llistarAlumnes");
            }
        });

    };
};
exports.modificarAlumne = function(req, res){
  res.render('modificarAlumne', { titol: 'Modificar un alumne' });
};


exports.modificarAlumneBD = function(db) {
    return function(req, res) {

        // recuperem les dades del formulari
        var nom = req.body.nom;
        var email = req.body.email;

        // obtenim la nostra col·lecció de dades
        var collection = db.get('alumnes');

        // desen a la BD
        collection.update({ "email" : email},{$set:{
            "nom" : nom,
            "email" : email
        }}, function (err, doc) {
            if (err) {
                console.log(err)
                res.send("problemes amb la base de dades.");
            }
            else {
            	operacions++;
                //canviem URL al navegador
                res.location("llistarAlumnes");
                //redireccionem
                res.redirect("llistarAlumnes");
            }
        });

    };
};
exports.esborrarAlumne = function(req, res){
  res.render('esborrarAlumne', { titol: 'Esborrar un alumne' });
};


exports.esborrarAlumneBD = function(db) {
    return function(req, res) {

        // recuperem les dades del formulari
        var email = req.body.email;

        // obtenim la nostra col·lecció de dades
        var collection = db.get('alumnes');

        // desen a la BD
        collection.remove({ "email" : email}, function (err, doc) {
            if (err) {
                
                res.send("problemes amb la base de dades.");
            }
            else {
            	operacions++;
                //canviem URL al navegador
                res.location("llistarAlumnes");
                //redireccionem
                res.redirect("llistarAlumnes");
            }
        });

    };
};