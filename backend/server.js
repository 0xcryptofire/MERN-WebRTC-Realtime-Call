require('dotenv').config();

const app = require('express')();
const PORT = process.env.PORT || 8000;

console.log(app);


app.get('/' , (req,res) =>{
    res.send('hello from expressJS')
})


app.listen(PORT , () =>{
    console.log(`Listening on PORT : ${PORT}`);
})