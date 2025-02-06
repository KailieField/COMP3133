require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io')
const path = require('path');

// --- [ ROUTES ] ---
const authenticationRoute = require('./routes/auth');
const chatTraffic = require('./routes/chatTraffic');
const GroupMessage = require('./models/GroupMessage');
const PrivateMessage = require('./models/PrivateMessage');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

app.use('/api/auth', authenticationRoute);
app.use('/api/chat', chatTraffic);

// --- [ SERVING STATIC FILES ] ---
app.use(express.static(path.join(__dirname, 'public')));


// -- Login View --
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// -- Sigup View --
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// -- Chat Page --
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname), 'views', 'chatTraffic.html');
});


// --- [ CONNECT TO MONGO DB ] ---
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('--- [ MONGO DATABASE CONNECTED ] ---'))
.catch(err => console.log('--- [ MONGO DATABASE CONNECTION ERROR ]: ', err));

const PORT = process.env.PORT || 3000;

// --- [ PREDEFINED ROOM LIST ] ---
const roomList = ['devOps', 'cloud computing', 'covid19', 'sports', 'nodeJS'];

// --- [ STORING CONNECTED USER FOR STATUS ] ---
let users = {};

// --- [ SOCKET CONNECTION ] ---
io.on('connection', (socket) => {
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

    // --- MESSAGING: Group Message ---
    socket.on('chatLog', async ({ room, chatMessage, user}) => {
        try{
            const newMessage = new GroupMessage({
                from_user: user,
                room: room,
                message: chatMessage
            });

            await newMessage.save();

            io.to(room).emit('message', { user, chatMessage });
        } catch (err) {

            console.error("--- [ ERROR SAVING GROUP MESSAGE ]: ", err.message);
        }
    })

        // --- MESSAGING: Private Message ---
    socket.io('PrivateMessage', async({ from_user, to_user, message}) =>{

        try {
        // -- save message in DB --
        const newMessage = new PrivateMessage({
            from_user,
            to_user,
            message
        });

        await newMessage.save();

        // -- private send --
        io.to(users[users]).emit('privateMessage', { from_user, message });

        }catch (err) {

            console.error("--- [ ERROR SAVING PRIVATE MESSAGE ]: ", err.message);

        }
    
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

    socket.on('disconnect', () => {
        console.log('--- [ USER DISCONNECTED ] ---');
    });
});


server.listen(PORT, () => console.log(`--- [ SERVER CONNECTED ON PORT : ${PORT} ] ---`));

