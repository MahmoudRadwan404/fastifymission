import app from "./server";
import getAllUsers from "./controllers/users/get-all-users";
import getSingleUser from "./controllers/users/get-single-user";
import addUser from "./controllers/users/add-user";
import updateUser from "./controllers/users/update-user";
import deleteUser from "./controllers/users/delete-user";
import logIn from "./controllers/users/log-in";
import verifyToken from "./validation/compare-token";
import forget from "./controllers/users/forget-pass";
import reset from "./controllers/users/reset-pass";
import makePost from "./controllers/posts/make-post";
import deletePost from "./controllers/posts/delete-post";
import listPosts from "./controllers/posts/list";
import updatePost from "./controllers/posts/edit-post";
import getSinglePost from "./controllers/posts/get-single-post";
import createPostValidation from "./validation/posts/create-post-validation";
import imageShow from "./controllers/posts/image-show";
import myPosts from "./controllers/posts/my-posts";
import posts from "./controllers/posts/posts";
import listCategories from "./controllers/categories/list-category";
import addCategory from "./controllers/categories/add-category";
import deleteCategory from "./controllers/categories/delete-category";
import updateCategory from "./controllers/categories/update-category";
import verifyAdmin from "./validation/verify-admin";
import getPrePosts from "./controllers/prePost/get-prePosts";
import getPrePost from "./controllers/prePost/get-prePost";
import acceptPrePost from "./controllers/prePost/accept-prePost";
import deletePrePost from "./controllers/prePost/delete-PrePost";
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
import getPreComment from "./controllers/pre-comments/get-preComment";
import getPreComments from "./controllers/pre-comments/get-preComments";
import acceptPreComment from "./controllers/pre-comments/accept-preComment";
import deletePreComment from "./controllers/pre-comments/delete-pre-comment";
import approvePost from "./controllers/prePost/approve-post";
import approveComment from "./controllers/pre-comments/approve-comment";
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
app.get("/posts", listPosts);
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
* /
app.patch(
  "/post/:postId/approve",
  { preHandler: [verifyToken, verifyAdmin] },
  approvePost
);
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
  "/preComments/:postId",
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
//post AND GET BASED ON LANGUAGE
app.get("/test", posts);
