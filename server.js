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
app.set('views', path.join(__dirname, 'pages'))
app.set('view engine', 'html');
app.use('/', require('./router/client_router'));
app.use('/auth', require('./router/auth_rauter'));
app.use('/admin', require('./router/admin_routes'));
app.use('/query', require('./router/admin_queries'));
app.use('/client_query', require('./router/client_query'));
app.use('/template', require('./router/client_template'));
app.use('/adstemplate', require('./router/admin_template'));
http.listen(PORT, () => console.log(`Listening on ${ PORT }`))