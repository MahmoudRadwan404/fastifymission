import app from "./server";
import getAllUsers from "./controllers/users/get-all-users";
import getSingleUser from "./controllers/users/get-single-user";
import addUser from "./controllers/users/add-user";
import updateUser from "./controllers/users/update-user";
import deleteUser from "./controllers/users/delete-user";
import logIn from "./controllers/users/login";
import verifyToken from "./validation/compare-token";
import forget from "./controllers/users/forget-pass";
import reset from "./controllers/users/reset-password";
import makePost from "./controllers/posts/make-post";
import deletePost from "./controllers/posts/delete-post";
import listPosts from "./controllers/posts/list-posts";
import updatePost from "./controllers/posts/edit-post";
import getSinglePost from "./controllers/posts/get-single-post";
import createPostValidation from "./validation/posts/create-post-validation";
import imageShow from "./controllers/posts/image-show";
import myPosts from "./controllers/posts/my-posts";
import listCategories from "./controllers/categories/list-categories";
import addCategory from "./controllers/categories/add-category";
import deleteCategory from "./controllers/categories/delete-category";
import updateCategory from "./controllers/categories/update-category";
import verifyAdmin from "./validation/verify-admin";
import getPrePosts from "./controllers/posts/get-unapproved-Posts";
import getPrePost from "./controllers/posts/get-unapproved-Post";
import makeComment from "./controllers/comments/make-comment";
import getPostComments from "./controllers/comments/get-post-comments";
import deletePostComment from "./controllers/comments/delete-comment";
import verifyAdminOrUser from "./validation/admin-or-user";
import editPostComment from "./controllers/comments/edit-comment";
import createAdmin from "./controllers/admin/create-admin";
import getAdmins from "./controllers/admin/get-admins";
import deleteAdmin from "./controllers/admin/delete-admin";
import updateAdmin from "./controllers/admin/update-admin";
import getComment from "./controllers/comments/get-comment";
import getPreComment from "./controllers/comments/get-unapproved-Comment";
import getPreComments from "./controllers/comments/get-unapproved-Comments";
import approvePost from "./controllers/posts/approve-post";
import approveComment from "./controllers/comments/approve-comment";
import likes from "./controllers/likes/likes";
import approveAll from "./controllers/posts/approve-all";
//-------------------login------------------------------------
app.get("/users", { preHandler: verifyToken }, getAllUsers);
app.get("/users/:id", getSingleUser);
app.post("/users", addUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
app.post("/users/logIn", logIn);
app.post("/users/forget", forget);
app.post("/users/reset", reset);
//------------------------posts------------------------
app.get("/posts", { preHandler: verifyToken }, listPosts);
app.get("/posts/:id", getSinglePost);
app.post(
  "/posts",
  { preHandler: [verifyToken, createPostValidation] },
  makePost
);
app.delete("/posts/:id", { preHandler: verifyToken }, deletePost);
app.put("/posts/:id", { preHandler: verifyToken }, updatePost);
app.get("/posts/me", { preHandler: verifyToken }, myPosts);
//-------------------crud for categories
app.get("/postsCategory", listCategories);
app.post("/postsCategory", addCategory);
app.delete("/postsCategory/:categoryId", deleteCategory);
app.put("/postsCategory/:categoryId", updateCategory);
//---------------------------------crud for prePost------------------------------------
app.get("/prePost", { preHandler: [verifyToken, verifyAdmin] }, getPrePosts); //
app.get(
  "/prePost/:prePostId",
  { preHandler: [verifyToken, verifyAdmin] },
  getPrePost
);

app.patch(
  "/post/:postId/approve",
  { preHandler: [verifyToken, verifyAdmin] },
  approvePost
);
app.patch("/post/approveAll", approveAll);
//--------------------------------crud for comments--------------------------------
app.get("/postComments/:postId", getPostComments);
app.get("/comments/:commentId", getComment);
app.post("/postComments/:postId", { preHandler: verifyToken }, makeComment);
app.delete(
  "/postComments/:commentId",
  { preHandler: [verifyToken, verifyAdminOrUser] },
  deletePostComment
);
app.patch(
  "/postComments/edit/:commentId",
  { preHandler: [verifyToken, verifyAdminOrUser] },
  editPostComment
);

//-------------------------------CRUD FOR ADMIN------------------------------
app.get("/admin", { preHandler: [verifyToken, verifyAdmin] }, getAdmins); //
app.post("/admin", { preHandler: [verifyToken, verifyAdmin] }, createAdmin); //
app.delete(
  "/admin/:adminId",
  { preHandler: [verifyToken, verifyAdmin] },
  deleteAdmin
);
app.patch(
  "/admin/:adminId",
  { preHandler: [verifyToken, verifyAdmin] },
  updateAdmin
);
//-----------------------------pre comments---CRUD-----------------------
app.get(
  "/preComments/:postId/notApproved",
  { preHandler: [verifyToken, verifyAdmin] },
  getPreComments
);
app.get(
  "/preComments/:preCommentId",
  { preHandler: [verifyToken, verifyAdmin] },
  getPreComment
);
app.patch(
  "/comment/:commentId/approve",
  { preHandler: [verifyToken, verifyAdmin] },
  approveComment
);
//---------likes ops---------------------
app.patch("/likes/:postId", { preHandler: [verifyToken] }, likes);
