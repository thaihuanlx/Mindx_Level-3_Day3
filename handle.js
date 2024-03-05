let users = [];
let posts = [];
let comments = [];

// Hàm tạo userId ngẫu nhiên
function generateUserId() {
  return "US" + Math.floor(1000 + Math.random() * 9000);
}

// Hàm tạo postId và commentId ngẫu nhiên
function generateId() {
  return Math.random().toString(36).substr(2, 5);
}

// Hàm tạo user mới
export function createUser(userName) {
  const userId = generateUserId();
  const newUser = { userId, userName };
  users.push(newUser);
  return newUser;
}

// Hàm tạo bài post mới
export function createPost(userId, content) {
  const postId = generateId();
  const newPost = { postId, userId, content, comments: [] };
  posts.push(newPost);
  return newPost;
}

// Hàm chỉnh sửa bài post
export function editPost(postId, userId, content) {
  const postIndex = posts.findIndex((post) => post.postId === postId);
  if (postIndex !== -1 && posts[postIndex].userId === userId) {
    posts[postIndex].content = content;
    return posts[postIndex];
  } else {
    throw new Error(
      "Không tìm thấy bài post hoặc bạn không có quyền chỉnh sửa"
    );
  }
}

// Hàm tạo comment mới
export function createComment(userId, postId, content) {
  const commentId = generateId();
  const newComment = { commentId, userId, postId, content };
  comments.push(newComment);
  const postIndex = posts.findIndex((post) => post.postId === postId);
  if (postIndex !== -1) {
    posts[postIndex].comments.push(newComment);
  }
  return newComment;
}

// Hàm chỉnh sửa comment
export function editComment(commentId, userId, content) {
  const commentIndex = comments.findIndex(
    (comment) => comment.commentId === commentId
  );
  if (commentIndex !== -1 && comments[commentIndex].userId === userId) {
    comments[commentIndex].content = content;
    return comments[commentIndex];
  } else {
    throw new Error("Không tìm thấy comment hoặc bạn không có quyền chỉnh sửa");
  }
}

// Hàm lấy tất cả comment của một bài post
export function getAllCommentsForPost(postId) {
  return comments.filter((comment) => comment.postId === postId);
}

// Hàm lấy tất cả các bài post và 3 comment đầu của tất cả user
export function getAllPosts() {
  return posts.map((post) => ({
    ...post,
    comments: post.comments.slice(0, 3), // Chỉ lấy 3 comment đầu
  }));
}

// Hàm lấy một bài post và tất cả comment của bài post đó thông qua postId
export function getPostWithComments(postId) {
  const post = posts.find((post) => post.postId === postId);
  if (post) {
    const postComments = getAllCommentsForPost(postId);
    return { post, comments: postComments };
  } else {
    throw new Error("Không tìm thấy bài post");
  }
}
