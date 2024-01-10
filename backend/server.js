require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || 8000;
const router = require('./routes')
const DBConnect = require('./database')
const cookieParser = require('cookie-parser')

const server = require('http').createServer(app);

const io = require('socket.io')(server , {
    cors : {
        origin : 'http://localhost:3000',
        methods : ['GET' , 'POST']
    }
})

app.use(cookieParser());
app.use( require('cors')({
    origin : ['http://localhost:3000'],
    credentials : true
}))
app.use(require('express').json({
    limit :'10mb'
}));
app.use('/storage' , require('express').static('storage'))      // to serve static file on /storage prefix
app.use(router);

DBConnect();

app.get('/' , (req,res) =>{
    res.send('hello from expressJS')
})

// socket logic 

const socketUserMap = {}

io.on('connection' , (socket) => {
    console.log('new connection' , socket.id);

    socket.on('join' , ({roomId , user}) => {
        socketUserMap[socket.id] = user;
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        // telling all the users 
        clients.forEach( clientID => {
            io.to(clientID).emit('add-peer' , {

            })
        })

        socket.emit('add-peer' , {})
        socket.join(roomId);

    })

})


server.listen(PORT , () =>{
    console.log(`Listening on PORT : ${PORT}`);
})