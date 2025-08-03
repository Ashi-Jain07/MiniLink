import { getUser, getUserById, loginUser, registerUser, updateUser } from "../Controller/userController.js"
import { auth } from "../Middleware/auth.js"

export const userRoutes = (app) => {
    app.post('/register', registerUser)
    app.post('/login', loginUser)
    app.get('/me', auth, getUser)
    app.get('/getUser/:id', getUserById);
    app.put('/updateUser/:id', auth, updateUser)
}