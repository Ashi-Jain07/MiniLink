import { createPost, deletePost, editPost, getAllPosts, getPostById } from "../Controller/postController.js";
import { auth } from "../Middleware/auth.js";

export const postRoutes = (app) => {
    app.get('/getallpost', getAllPosts);
    app.post('/createpost', auth, createPost);
    app.get('/getpost/:userId', getPostById)
    app.put('/editpost/:postId', auth, editPost);
    app.delete('/deletepost/:postId', auth, deletePost);
}