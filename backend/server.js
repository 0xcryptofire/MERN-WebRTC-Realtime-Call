require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || 8000;
const router = require('./routes')
const DBConnect = require('./database')
const cookieParser = require('cookie-parser')


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


app.listen(PORT , () =>{
    console.log(`Listening on PORT : ${PORT}`);
})