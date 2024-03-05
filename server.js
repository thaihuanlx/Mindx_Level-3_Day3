// import express from "express";
// import bodyParser from "body-parser";
// import { v4 as uuidv4 } from "uuid";
// import { jsonServer } from "json-server";

// const app = express();
import jsonServer from "json-server";
import { v4 as uuidv4 } from "uuid";

const app = jsonServer.create();

app.use(jsonServer.bodyParser);
const PORT = 3000;

// app.use(bodyParser.json());

let users = [];
let posts = [];

// Đăng ký user
app.post("/users", (req, res) => {
  const { userName } = req.body;
  const id = "US" + uuidv4().substring(0, 4);

  if (users.find((user) => user.id === id)) {
    return res.status(400).json({ error: "User already exists" });
  }

  db.users.push({ id, userName });
  res.status(201).json({ id, userName });
});

// Tạo bài post
app.post("/posts", (req, res) => {
  const { userId, title, content } = req.body;
  const id = "POST" + uuidv4().substring(0, 4);

  posts.push({ id, userId, title, content, comments: [] });
  res.status(201).json({ id, userId, title, content });
});

// Chỉnh sửa bài post
app.put("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const { userId, title, content } = req.body;
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (post.userId !== userId) {
    return res.status(403).json({ error: "Unauthorized to edit this post" });
  }

  post.title = title;
  post.content = content;
  res.status(200).json(post);
});

// Comment vào bài post
app.post("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.comments.push({ userId, content });
  res.status(201).json(post.comments);
});

// Chỉnh sửa comment
app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { userId, content } = req.body;
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const comment = post.comments.find((comment) => comment.id === commentId);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  if (comment.userId !== userId) {
    return res.status(403).json({ error: "Unauthorized to edit this comment" });
  }

  comment.content = content;
  res.status(200).json(comment);
});

// Lấy tất cả comment của một bài post
app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post.comments);
});

// Lấy tất cả các bài post và 3 comment đầu của tất cả user
app.get("/posts", (req, res) => {
  const postsWithComments = posts.map((post) => {
    const { id, userId, title, content, comments } = post;
    const top3Comments = comments.slice(0, 3);
    return { id, userId, title, content, comments: top3Comments };
  });

  res.status(200).json(postsWithComments);
});

// Lấy một bài post và tất cả comment của bài post
app.get("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
