const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();


const assetRoutes = require('./routes/assets'); 
const masterDataRoutes = require('./routes/masterData');
const userRoutes = require('./routes/users');


const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // หรือ Port ที่ Vite ของคุณรันอยู่
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('IT Command Backend is running!');
});


app.use('/api/assets', assetRoutes);
app.use('/api/master-data', masterDataRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });