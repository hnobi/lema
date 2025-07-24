import express from 'express';
import { listPosts, deletePost } from '../controllers/postsController.js';

const router = express.Router();

router.get('/user/:userId', listPosts);

router.delete('/:postId', deletePost);

export default router;
