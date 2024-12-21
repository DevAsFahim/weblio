import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

// block a user int db
const blockUser = async (userId: string) => {
  const result = await User.findByIdAndUpdate(userId, { isBlocked: true });
  return result;
};

// delete blog
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUser,
  deleteBlogFromDB,
};
