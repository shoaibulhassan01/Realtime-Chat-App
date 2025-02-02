require('dotenv').config();
const express = require("express");
const http = require('http');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require("./routes/userRoute");
const messageRoute = require('./routes/messageRoute');
const { initSocket } = require('./socket/socket'); // Import the initSocket function

const app = express();
const PORT = 8000;

const server = http.createServer(app);


// Initialize Socket.IO
initSocket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at ${PORT}`);
});


server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please choose another port.`);
      process.exit(1); // Exit the application
    } else {
      console.error('An error occurred:', err);
    }
  });