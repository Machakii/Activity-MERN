const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const createSampleAdmin = require('./utils/createSampleAdmin');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin-only', adminRoutes);
app.use('/api/book', bookRoutes);

// create sample admin on startup
createSampleAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
