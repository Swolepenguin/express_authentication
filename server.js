require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig')
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION
console.log(SECRET_SESSION)
const app = express();

//isLoggedIn middleware
const isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

//secret what we actually will be giving to the user on our site as a session cookie
//resave: save the session even if its modifed, make this false 
//saveuninitialized: if we have a new session, we save it, therfore making that true  
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveuninitialized: true
}

app.use(session(sessionObject));

//initiailize passport and run through middleware
app.use(passport.initialize());
app.use(passport.session());

//using flash throughout app to send temporary meessages to user
app.use(flash())
//messages that will accessible to evry view
app.use((req,res,next)=>{
  //before every route we will attach user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', (req, res) => {
  console.log(res.locals.alerts)
  res.render('index', {alerts:res.locals.alerts});
});

//checking to see if user is logged in 
app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
