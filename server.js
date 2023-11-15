const express = require('express')
const path = require('path')
const app = express();
const session = require('express-session');

const PORT = process.env.PORT || 5001

app.use(session({
  secret: 'webslesson',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




app.get('/', (req, res) => res.render('pages/index'))







app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
