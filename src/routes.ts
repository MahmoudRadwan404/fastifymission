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
app.get("/posts/:id", getSinglePost); //<<<<<<<----------------------
app.post(
  "/posts",
  { preHandler: [verifyToken, createPostValidation] },
  makePost
);
app.delete("/posts/:id", { preHandler: verifyToken }, deletePost);
app.put("/posts/:id", { preHandler: verifyToken }, updatePost);
app.get("/posts/me", { preHandler: verifyToken }, myPosts);
//-------------------crud for categories

//app.get("/postsCategory", listCategories);
app.get("/postsCategory", listCategories);
app.post("/postsCategory", addCategory);
app.delete("/postsCategory/:categoryId", deleteCategory);
app.put("/postsCategory/:categoryId", updateCategory);
//---------------------------------crud for prePost------------------------------------
app.get("/prePost", { preHandler: [verifyToken, verifyAdmin] }, getPrePosts)
app.get("/prePost/:prePostId", { preHandler: [verifyToken, verifyAdmin] }, getPrePost)
app.delete("/prePost/accept/:prePostId", { preHandler: [verifyToken, verifyAdmin] }, acceptPrePost)
app.delete("/prePost/reject/:prePostId", { preHandler: [verifyToken, verifyAdmin] }, deletePrePost)
//--------------------------------crud for comments--------------------------------
app.get("/postComments/:postId", getPostComments)
app.post("/postComments/:postId", { preHandler: verifyToken }, makeComment)
app.delete("/postComments/:commentId", { preHandler: [verifyToken, verifyAdminOrUser] }, deletePostComment)
app.patch("/postComments/edit/:commentId", { preHandler: [verifyToken, verifyAdminOrUser] }, editPostComment)



//post AND GET BASED ON LANGUAGE
app.get("/test", posts)