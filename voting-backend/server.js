import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import electionRoutes from './routes/elections.js'
import authRoutes from './routes/auth.js';
import candidateRoutes from './routes/candidates.js';
import voteRoutes from './routes/vote.js';
import resultRoutes from './routes/results.js';
import profileRoutes from './routes/profile.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct env variable name
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI; 

if (!DB_URI) {
  console.error("❌ DB_URI is missing. Please check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => {
    console.error("❌ Error connecting to DB:", err);
    process.exit(1);
  });

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/results', resultRoutes);
app.use("/api/elections",electionRoutes)
app.use("/api/profile",profileRoutes)

app.get('/', (req, res) => res.send({ ok: true, message: "Voting API running" }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); 
