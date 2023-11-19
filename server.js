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
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/pages'))
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs')
//app.set('view engine', 'jade');
app.set('view engine', 'html');

// app.use('/client_partials', require('./router/re_routing/client_partials'));

app.use('/', require('./router/client_router'));
// app.use('/auth', require('./router/auth_rauter'));
// app.use('/admin', require('./router/admin_routes'));
// app.use('/query', require('./router/admin_queries'));
// app.use('/client_query', require('./router/client_query'));

http.listen(PORT, () => console.log(`Listening on ${ PORT }`))