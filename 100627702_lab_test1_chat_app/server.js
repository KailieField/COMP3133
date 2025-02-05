require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io')
const authenticRoutes = require('./routes/auth');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

app.use('/api/auth', authenticRoutes);

// --- [ CONNECT TO MONGO DB ] ---
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('--- [ MONGO DATABASE CONNECTED ] ---'))
.catch(err => console.log('--- [ MONGO DATABASE CONNECTION ERROR ]: ', err));

const PORT = process.env.PORT || 3000;

// --- [ PREDEFINED ROOM LIST ] ---
const roomList = ['DevOps', 'Cloud Computing', 'Covid19', 'Sports', 'nodeJS'];

io.on('connection', (socket) => {
    console.log('--- [ USER CONNECTED ] ---');

    // --- Entering Chat (joining) ---
    socket.on('enterChat', (room) => {
        if(roomList.includes(room)) {
            socket.join(room);
            console.log(`--- [ USER JOINED ${room}] ---`);
            io.to(room).emit('message', { user: "Admin", message: ` New User Entered ${room} Chat.`});
        }else {
            socket.emit('message', {user: "Admin", message: ' Chat Room Does Not Exist.'});
        }
    });

    // --- Messaging ---
    socket.on('chatLog', ({ room, message, user }) => {
        io.to(room).emit('message', { user, message });
    });

    //--- Exiting Chat ---
    socket.on('exitChat', (room) => {
        socket.leave(room);
        console.log(`User Exit ${room}`);
        io.to(room).emit('message', { user: "Admin", message: `User Exit ${room} Chat.`});
    });

    socket.on('disconnect', () => {
        console.log('--- [ USER DISCONNECTED ] ---');
    });
});


server.listen(process.env.PORT, () => console.log(`--- [ SERVER CONNECTED ON ${PORT} ] ---`));
