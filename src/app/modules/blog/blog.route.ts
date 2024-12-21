import { Router } from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post('/', auth('user', 'admin'), BlogController.createBlog);

export const BlogRoutes = router;
