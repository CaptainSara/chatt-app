const express = require('express')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddelware')
const path = require("path");
const acl = require("acl")


const app = express()
require("./parseEnv.js");
//dotenv.config()
connectDB()

app.use(express.json()) //Accept the JSON data fom frontend

// serve dist folder in production mode
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use((req, res, next) => {
  if (req.url.indexOf("/api") !== 0 && !req.url.includes(".")) {
    // it is a frontend / react router route so send index.html
    res.set("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  }
  else {
    next();
  }
});

/* app.get('/', (req, res) => {
  res.send("API is running")
}) */

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)


// Error Handling middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io")

  socket.on("setup", (userData) => {
    socket.join(userData._id)
    socket.emit("connected")
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room)
  });
    
  socket.on("typing", (room) => socket.in(room).emit("typing"))
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

   socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat

    if (!chat.users) return console.log("chat.users not defined")

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return

      socket.in(user._id).emit("message recieved", newMessageRecieved)
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
   });
});

//ACL
function setRoles() {
  acl.allow([
    {
      roles: "user",
      allows: [
        { resources: '/user', permissions: 'create' },
      ]
    },
    {
      roles: "admin",
      allows: [
        { resources: '/user', permissions: '*' },
        { resources: '/chats', permissions: ['get', 'delete'] },
        { resources: '/message', permissions: ['post', 'delete'] }
      ]
    }
  ])  
}
