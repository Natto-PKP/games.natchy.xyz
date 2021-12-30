const express = require('express');
const path = require('path');

const server = express();

/** Configuration */
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, 'static')));

/** routers */
server.use('/', require('./routers/index'));

server.listen(5050);
