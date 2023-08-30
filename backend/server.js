const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middlewares/error.js');
const chatRoutes = require('./routes/chatRoutes.js');

//Setting up body parser
app.use(express.json()); // to accept json data

//Connecting to MongoDB
dotenv.config();
connectDB();

//Setting Cors
app.use(cors());
cors({ credentials: true, origin: '*' });

app.get('/', (req, res) => {
    res.send('API Running!');
});

//Routes
app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);

//Middleware for error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));