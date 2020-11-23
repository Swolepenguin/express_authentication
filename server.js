require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig')
const flash = require('connect-flash');
const SECRET_SESSION = process.env.SECRET_SESSION
console.log(SECRET_SESSION)
const app = express();


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


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
