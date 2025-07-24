import express from 'express';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});