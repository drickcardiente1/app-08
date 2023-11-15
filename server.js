const express = require('express')
const path = require('path')
const app = express();
const session = require('express-session');


const http = require("http").createServer(app);
const io = require("socket.io")(http)

io.on('connection', socket =>{
    socket.on('msg-recieve',msg=>{
        socket.broadcast.emit('msg-send', msg );

    });
})

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







http.listen(PORT, () => console.log(`Listening on ${ PORT }`))
