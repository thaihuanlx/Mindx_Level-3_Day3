import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Đăng ký user
export const registerUser = async (userName) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, { userName });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response.data);
    throw error.response.data;
  }
};

// Tạo bài post
export const createPost = async (userId, title, content) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, {
      userId,
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response.data);
    throw error.response.data;
  }
};

// Chỉnh sửa bài post
export const editPost = async (postId, userId, title, content) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, {
      userId,
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing post:", error.response.data);
    throw error.response.data;
  }
};

// Comment vào bài post
export const addCommentToPost = async (postId, userId, content) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts/${postId}/comments`, {
      userId,
      content,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error.response.data);
    throw error.response.data;
  }
};

// Chỉnh sửa comment
export const editComment = async (postId, commentId, userId, content) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/posts/${postId}/comments/${commentId}`,
      { userId, content }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing comment:", error.response.data);
    throw error.response.data;
  }
};

// Lấy tất cả comment của một bài post
export const getCommentsForPost = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error getting comments for post:", error.response.data);
    throw error.response.data;
  }
};
