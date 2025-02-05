require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io')
const authenticRoutes = require('./routes/auth');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

// --- [ SERVING STATIC FILES ] ---
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authenticRoutes);

// --- [ SERVING INDEX ] ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// --- [ CONNECT TO MONGO DB ] ---
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('--- [ MONGO DATABASE CONNECTED ] ---'))
.catch(err => console.log('--- [ MONGO DATABASE CONNECTION ERROR ]: ', err));

const PORT = process.env.PORT || 3000;

// --- [ PREDEFINED ROOM LIST ] ---
const roomList = ['DevOps', 'Cloud Computing', 'Covid19', 'Sports', 'nodeJS'];

// --- [ STORING CONNECTED USER FOR STATUS ] ---
let users = {};

// --- [ USER ONLINE ] ---
io.on('online', (socket) => {
    console.log('--- [ USER IS ONLINE ] ---');

    socket.on('userOnline', (username) => {

        users[username] = socket.id;
        io.emit('statusUpdate', users);

    });

    // --- Entering Chat (joining) ---
    socket.on('enterChat', (room) => {

        if(roomList.includes(room)) {
            socket.join(room);
            console.log(`--- [ USER JOINED ${room} ] ---`);
            io.to(room).emit('message', { user: "Admin", message: ` New User Entered ${room} Chat.`});
        }else {
            socket.emit('message', {user: "Admin", message: ' Chat Room Does Not Exist.'});
        }
    });

    // --- Messaging ---
    socket.on('chatLog', ({ room, chatMessage, user }) => {

        io.to(room).emit('message', { user, chatMessage });

    });

    //--- Exiting Chat ---
    socket.on('exitChat', (room) => {
        socket.leave(room);
        console.log(`--- [ USER EXITED ${room} ] ---`);
        io.to(room).emit('message', { user: "Admin", message: `User Exit ${room} Chat.`});
    });

    socket.on('offline', () => {
        console.log('--- [ USER IS OFFLINE ] ---');
    });

    // --- Typing Indicator ---
    socket.on('isTyping', ({ user, room }) => {
        socket.to(room).emit('typingAction', `${user}'s typing...`);
    });

    socket.on('notTyping', ({ room }) => {
        socket.to(room).emit('typingAction', '');
    });

    // --- [ USER OFFLINE ] ---
    socket.on('offline', () => {
        for (let user in users){
            if (users[user] === socket.id){
                delete users[user];
                break;
            }
        }

        io.emit('statusUpdate', users);
        console.log('User went offline');

    });
});


server.listen(PORT, () => console.log(`--- [ SERVER CONNECTED ON PORT : ${PORT} ] ---`));

