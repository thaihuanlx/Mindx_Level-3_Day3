import express from "express";
import {
  createUser,
  createPost,
  editPost,
  createComment,
  editComment,
  getAllComments,
  getAllPosts,
  getPostWithComments,
  getAllUsersFromCache,
} from "./handle.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Đăng ký user
app.post("/users", (req, res) => {
  const { userName } = req.body;
  const user = createUser(userName);
  res.json(user);
});

// Lấy danh sách user từ cache
app.get("/users", (req, res) => {
  const userList = getAllUsersFromCache(userCache);
  res.json(userList);
});

// Tạo bài post
app.post("/posts", (req, res) => {
  const { userId, content } = req.body;
  const post = createPost(userId, content);
  res.json(post);
});

// Chỉnh sửa bài post
app.put("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  const post = editPost(postId, userId, content);
  res.json(post);
});

// Comment vào bài post
app.post("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  const comment = createComment(postId, userId, content);
  res.json(comment);
});

// Chỉnh sửa comment
app.put("/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const { userId, content } = req.body;
  const comment = editComment(commentId, userId, content);
  res.json(comment);
});

// Lấy tất cả comment của một bài post
app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const comments = getAllComments(postId);
  res.json(comments);
});

// Lấy tất cả các bài post và 3 comment đầu của tất cả user
app.get("/posts", (req, res) => {
  const posts = getAllPosts();
  res.json(posts);
});

// Lấy một bài post và tất cả comment của bài post đó thông qua postId
app.get("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const postWithComments = getPostWithComments(postId);
  res.json(postWithComments);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
