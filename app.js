const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nocache = require('nocache');
const session = require('express-session')
const cors = require('cors');
const isolatedSession = require('./app/middleware/isolateSession')

const webRouter = require('./routes/web');
const apiRouter = require('./routes/api')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(nocache())

// Remake app but using old core =(
app.use('/api/', cors(), apiRouter);

app.use('/', session({
      resave: true,
      saveUninitialized: true,
      secret: 'this-is-a-secret-token',
      cookie: {
          maxAge: 600,
          secure: true
      },
    }),
    // isolatedSession,
    webRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
