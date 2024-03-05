let users = [];
let posts = [];
let userCache = {};

// Hàm lấy thông tin user từ cache
export const getUserFromCache = (userId) => {
  return userCache[userId];
};

// Hàm lấy danh sách user từ cache
export const getAllUsersFromCache = () => {
  return Object.values(userCache);
};

// Hàm sinh id ngẫu nhiên
const generateId = () => {
  const id = "US" + Math.floor(Math.random() * 10000);
  return id;
};

// Hàm tạo user
export const createUser = (userName) => {
  const id = generateId();
  const user = { id, userName };
  users.push(user);
  userCache[id] = user;
  return user;
};

// Hàm tạo bài post
export const createPost = (userId, content) => {
  const id = generateId();
  const post = { id, userId, content, comments: [] };
  posts.push(post);
  return post;
};

// Hàm chỉnh sửa bài post
export const editPost = (postId, userId, content) => {
  const post = posts.find((post) => post.id === postId);
  if (post && post.userId === userId) {
    post.content = content;
    return post;
  } else {
    return null;
  }
};

// Hàm comment vào bài post
export const createComment = (postId, userId, content) => {
  const post = posts.find((post) => post.id === postId);
  if (post) {
    const comment = { id: generateId(), userId, content };
    post.comments.push(comment);
    return comment;
  } else {
    return null;
  }
};

// Hàm chỉnh sửa comment
export const editComment = (commentId, userId, content) => {
  for (let post of posts) {
    const comment = post.comments.find((comment) => comment.id === commentId);
    if (comment && comment.userId === userId) {
      comment.content = content;
      return comment;
    }
  }
  return null;
};

// Hàm lấy tất cả comment của một bài post
export const getAllComments = (postId) => {
  const post = posts.find((post) => post.id === postId);
  if (post) {
    return post.comments;
  } else {
    return null;
  }
};

// Hàm lấy tất cả các bài post và 3 comment đầu của tất cả user
export const getAllPosts = () => {
  return posts.map((post) => ({
    ...post,
    comments: post.comments.slice(0, 3),
  }));
};

// Hàm lấy một bài post và tất cả comment của bài post đó thông qua postId
export const getPostWithComments = (postId) => {
  const post = posts.find((post) => post.id === postId);
  return post ? post : null;
};
