/**
 * Exercici amb middleware i rutes en Express complet
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes El Clot
 * date 19.01.2026
 * format del document UTF-8
 * CHANGELOG
 * 19.01.2026
 * - Actualització a Express 5.0.0
 */

const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

// connexio BDs
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('mongodb://127.0.0.1:27017/alumnes');

const app = express();


// configuració del motor de vistes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', routes.index);

app.get('/salutacio', routes.salutacio);
app.get('/llistarAlumnes', routes.llistarAlumnes(db));
app.get('/afegirAlumne', routes.afegirAlumne);
app.get('/modificarAlumne', routes.modificarAlumne);
app.get('/esborrarAlumne', routes.esborrarAlumne);

app.post('/afegirAlumneBD', routes.afegirAlumneBD(db));
app.post('/modificarAlumneBD', routes.modificarAlumneBD(db));
app.post('/esborrarAlumneBD', routes.esborrarAlumneBD(db));

/// capturar 404 i reenviar al gestor d'errors
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// gestors d'errors

// gestor d'errors en desenvolupament
// mostrarà la traça de l'stack
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// gestor d'errors en producció
// no es mostren traces d'stack a l'usuari
app.use((err, req, res, next) => {
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
