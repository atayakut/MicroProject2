import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002; 
app.use(express.json());

console.log("Connecting to MongoDB...");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.log('Failed to connect to MongoDB');
    console.error(err);
  });

app.post('/users', async (req, res) => {
  console.log("Received a POST request to /users");
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log("Error saving user");
    console.error(err);
    res.status(400).send(err);
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.status(200).send('Server is working correctly');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

