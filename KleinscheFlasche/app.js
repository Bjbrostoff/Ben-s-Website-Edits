var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var teachers = require('./routes/teachers');
var demo = require('./routes/demo');
var courses = require('./routes/courses');
var favorites = require('./routes/favorites');
var mod = require('./routes/mod');

var uuid = require('node-uuid');

var events=require('./routes/calendar');

var homework=require('./routes/homework');

var todayInfo=require('./routes/todayInfo');

//test
var amap = require('./routes/amap/map');

var app = express();
var memoryStore = session.MemoryStore;
var sessionTime = 0.5;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name:'sid',
  cookie:{maxAge:sessionTime *60 *60 *1000},
  resave:false,
  saveUninitialized:true,
  secret: 'keyboard cat',
  store: new MongoStore({
      url: 'mongodb://localhost:27017/Klein',
      ttl:  sessionTime *60 *60 *1000 // = 24 hours. Default
    })
}));

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

var mongoHelper = require('./app/util/mongoUtil');

mongoHelper.connect(function(error){
  if (error) throw error;
});

app.on('close', function(error) {
  mongoHelper.disconnect(function(err){

  })
});


//filter
 app.use( function(req, res, next){

  if ( req.originalUrl == "gulp" ||  req.originalUrl == "/"  || req.originalUrl == "/users/loginIn" || req.originalUrl.indexOf('register') > -1
    || req.originalUrl == "/users/sendEmail" || req.originalUrl == '/courses' || req.originalUrl == '/teachers'|| req.originalUrl == '/agencies'
    || req.originalUrl.indexOf('/courses' )!=-1 || req.originalUrl.indexOf('/teachers' )!=-1 || req.originalUrl.indexOf('/agencies' )!=-1
    || req.originalUrl == '/users/regToSession'|| req.originalUrl == '/mod/course/createCourse')
  {
	  if (req.session.user){
		  console.log('has session');
		  res.locals ={
			  sessinfo : req.session,
			  user :req.session.user
		  }

	  }
    next();
  }else{

    if (req.session.user){
      console.log('has session');
      res.locals ={
	      sessinfo : req.session,
	      user :req.session.user
      }
      next();
    }else{
	    console.log(req.originalUrl);
      console.log('no session');
      res.redirect('/');
    }
  }

}) 


app.use('/', routes);
app.use('/demo', demo);
app.use('/users', users);
app.use('/teachers', teachers);
app.use('/courses', courses);
app.use('/favorites', favorites);
app.use('/mod', mod);

app.use('/events', events);
app.use('/homework',homework);
app.use('/today',todayInfo);

//test
app.use('/amap', amap);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
