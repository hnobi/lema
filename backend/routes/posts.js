import express from 'express';
import { listPosts, deletePost, addPost } from '../controllers/postsController.js';

const router = express.Router();

router.get('/user/:userId', listPosts);

router.delete('/:postId', deletePost);
router.post('/', addPost);


export default router;
