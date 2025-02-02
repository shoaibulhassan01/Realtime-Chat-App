const { Server } = require('socket.io');

let io;
const userSocketMap = {};

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('User Connected:', socket.id);
        const userId = socket.handshake.query.userId;
        if (userId !== undefined) {
            userSocketMap[userId] = socket.id;
        }

        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log('User Disconnected:', socket.id);
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const getIO = () => {
    return io;
};

module.exports = { initSocket, getReceiverSocketId, getIO };
