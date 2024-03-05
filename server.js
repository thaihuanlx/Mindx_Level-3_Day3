import express from "express";
import bodyParser from "body-parser";
import {
  createUser,
  createPost,
  editPost,
  createComment,
  editComment,
  getAllCommentsForPost,
  getAllPosts,
  getPostWithComments,
} from "./handle.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Đăng ký user
app.post("/users", (req, res) => {
  const { userName } = req.body;
  const user = createUser(userName);
  res.json(user);
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
  const updatedPost = editPost(postId, userId, content);
  res.json(updatedPost);
});

// Comment vào bài post
app.post("/comments", (req, res) => {
  const { userId, postId, content } = req.body;
  const comment = createComment(userId, postId, content);
  res.json(comment);
});

// Chỉnh sửa comment
app.put("/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const { userId, content } = req.body;
  const updatedComment = editComment(commentId, userId, content);
  res.json(updatedComment);
});

// Lấy tất cả comment của một bài post
app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const comments = getAllCommentsForPost(postId);
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
