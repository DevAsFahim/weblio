import { Router } from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth('user'), BlogController.deleteBlog);

router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
