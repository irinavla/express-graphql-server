  
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const schema = require('./schema/schema');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true })
mongoose.connect('mongodb://irinavls:pass1234@ds061807.mlab.com:61807/gz-console');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongoDB connection established');
});

const notificationsRouter = require('./routes/notifications');

app.use('/notifications', notificationsRouter);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


io.set("origins", "*:*");

  getApiAndEmit = async socket => {
    try {          
        const res = await axios.get('http://localhost:5000/notifications');       
        socket.emit("get notifications", res.data);     
    } catch (error) {      
      console.error('Error', error);    
    }
  }


let interval;  
//   io.on('connect', function(socket) {    
//     console.log("New client connected"); 

//     socket.on('new notification', () => {
//       console.log('new notification received');
//     });  
//       
//   getApiAndEmit(socket);     
//    if (interval) {        
//       clearInterval(interval);     
//    } 

//   interval = setInterval(() => getApiAndEmit(socket), 6000);
// })

server.listen(port, () => {
  console.log("Backend Server is running on http://localhost:5000");
});