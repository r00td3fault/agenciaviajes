 // version vieja commo -> const express = require('express');
 import express from 'express';
 import router from './routes/index.js';
 import db from './config/db.js';
 
 console.log(process.env);
 const app = express();

 //conectarr bd 

 db.authenticate()
    .then( () => console.log('base de datos conevctada') )
    .catch( error => console.log(error) )


 // Habilitar PUG
 app.set('view engine', 'pug');

 // Obtener el ano actual
 app.use( (req, res, next) => {

    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes";
    next();
 });

 // Agregar body parser para leer datos del formulario
 app.use(express.urlencoded({extended: true}));

 //Definir la carpeta publica
 app.use(express.static('public'));

 //Agregar router
 app.use('/', router);

 //puerto y host para la ap

  //Definir puerto y host
  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || 4000;

  console.log("host",host, "port   ", port);
 app.listen(port, host, () => {
     console.log(`el servidor esta funcionandoen el puerto ${port}`);
 })