import { createPost, getAllPosts, getPostById } from "../Controller/postController.js";
import { auth } from "../Middleware/auth.js";

export const postRoutes = (app) => {
    app.get('/getallpost', getAllPosts);
    app.post('/createpost', auth, createPost);
    app.get('/getpost/:userId', getPostById)
}