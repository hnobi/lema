import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (page = 1, limit = 10) => {
    
  try {
    const res = await axios.get(`${API_BASE_URL}/api/users`, {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/posts/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error);
    throw new Error(`Failed to fetch user with ID: ${userId}`);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to delete post ${postId}:`, error);
    throw new Error(`Failed to delete post with ID: ${postId}`);
  }
}
