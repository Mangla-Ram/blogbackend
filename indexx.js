import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoute from './routes/blog_route.js';
import userRoute from './routes/user_route.js';
import { userSignUp } from './controllers/user_controller.js';
dotenv.config();

const uri = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT || 5000;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

app.use(express.json());
app.use("/",blogRoute);
app.use("/user",userRoute);

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'I am running'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


