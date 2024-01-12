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

    // handle join
    socket.on('join' , ({roomId , user}) => {
        socketUserMap[socket.id] = user;
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        // telling all the users 
        clients.forEach( clientID => {
            io.to(clientID).emit('add-peer' , {
                peerId : socket.id,
                createOffer : false,
                user : user
            })
            socket.emit('add-peer' , {
                peerId : clientID,
                createOffer : true,
                user : socketUserMap[clientID]
            })
        })
        socket.join(roomId);

    })

    // handel relay-ice

    socket.on('relay-ice' , ({peerId , icecandidate}) =>{
        io.to(peerId).emit('ice-candidate' , {
            peerId : socket.id,
            icecandidate
        })
    })

    // handle relay-sessionDescription

    socket.on('relay-sessionDescription' , ({peerId , sessionDescription}) =>{
        io.to(peerId).emit('session-description' , {
            peerId : socket.id,
            sessionDescription
        })
    })

    // leaving the room
    const leaveRoom = ({roomId}) => {
        const { rooms } = socket;
        
        Array.from(rooms).forEach(roomId => {
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

            clients.forEach(clientId => {
                io.to(clientId).emit('remove-peer', {
                    peerId: socket.id,
                    userId : socketUserMap[socket.id]._id
                })
                socket.emit('remove-peer',{
                    peerId : socket.id,
                    userId : socketUserMap[clientId]._id
                })
            })

            socket.leave(roomId)
        })
        delete socketUserMap[socket.id];
    }
    socket.on('leave' , leaveRoom)
})


server.listen(PORT , () =>{
    console.log(`Listening on PORT : ${PORT}`);
})