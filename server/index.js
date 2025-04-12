const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const shipmentRoutes = require('./routes/shipment');
const warehouseRoutes = require('./routes/warehouse');
const userRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');

const { verifyToken } = require('./middlewares/auth');


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Socket.io setup
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('shipmentStatusUpdate', (data) => {
    io.emit('shipmentStatusUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});


app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/shipments',
    verifyToken, 
      shipmentRoutes);
app.use('/api/warehouses', verifyToken, warehouseRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
