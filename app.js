const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const saggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger.config');
const routes = require('./routes/index.routes.js');
const { handleError } = require('./middlewares/errorHandler.mdw.js');
const unknownEndpoint = require('./middlewares/unknownEndpoint.mdw.js');
require('dotenv').config();

const app = express();

// Swagger
const swaggerDocs = saggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use(routes);

// Error handling
app.use(unknownEndpoint);
app.use(handleError);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
  console.log(`Swagger is running on http://localhost:${process.env.SERVER_PORT}/api-docs`);
  console.log(`Swagger Json is running on http://localhost:${process.env.SERVER_PORT}/api.json`);
});

module.exports = app;
