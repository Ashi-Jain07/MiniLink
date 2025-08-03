# MiniLink - A Community Platform

A full-stack social networking platform.

## 🚀 Tech Stack

**Frontend:**
- React 18 with Hooks
- React Router for navigation
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js with Express.js
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

**Database:**
- MongoDB with Mongoose ODM

## 📋 Features

### ✅ Required Features
- **User Authentication**: Register/Login with email & password
- **User Profiles**: Name, email, bio display
- **Post Management**: Create and view text posts
- **Public Feed**: Timeline with author names and timestamps
- **Profile Pages**: Individual user profiles with their posts

### ⭐ Extra Features
- **Edit Post ann Delete Post**: Authenticate user can edit or delete their post
- **Real-time Timestamps**: "2 minutes ago" format
- **Input Validation**: Form validation and error handling
- **Responsive Design**: Mobile-friendly interface
- **Post Character Counter**: 500 character limit for posts
- **Loading States**: Better UX with loading indicators
- **Protected Routes**: Authentication-based navigation

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Clone the repository
```bash
git clone https://github.com/Ashi-Jain07/MiniLink.git
```

### Backend Setup

1. **Navigate to backend directory:**
```bash 
cd Backend
```

2. **Install dependencies**
```bash
npm install 
```

3. **Backend Folder structure:**
```
Backend/
├── Controller/
│   ├── postController.js
│   └── userController.js
├── Middleware/
│   └── auth.js
├── Model/
│   ├── postModel.js
│   └── userModel.js
├── Routes/
│   ├── postRoutes.js
│   ├── userRoutes.js
├── .env
└── server.js
```

4. **SetUp Environment variables (.env):**
```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
```

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd Frontend
```

2. **Install dependencies**
```bash
npm install 
```

3. **Frontend folder structure:**
```
Frontend/src/
├── Components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Feed/
│   │   ├── Feed.jsx
│   │   ├── PostForm.jsx
│   │   └── PostCard.jsx
│   ├── Profile/
│   │   └── Profile.jsx
│   └── Layout/
│       ├── Header.jsx
│       └── ProtectedRoute.jsx
├── services/
│   └── api.js
├── context/
│   └── authContext.jsx
├── App.jsx
└── main.jsx
```

### Database Setup

1. **Start MongoDB locally:**
```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Windows
net start MongoDB

# For Linux
sudo systemctl start mongod
```

2. **Or use MongoDB Atlas (cloud):**
   - Create account at mongodb.com
   - Create cluster and get connection string
   - Update MONGODB_URI in .env

### Running the Application

1. **Start Backend (Terminal 1):**
```bash
cd Backend
npm start
# Server runs on http://localhost:5000
```

2. **Start Frontend (Terminal 2):**
```bash
cd Frontend
npm run dev
# App runs on http://localhost:5173
```

## 👥 Demo Users

### Test Users
- **Email**: john.doe@example.com
- **Password**: password123
- **Bio**: "Full Stack Developer passionate about MERN stack"

- **Email**: jane.smith@example.com  
- **Password**: password123
- **Bio**: "UI/UX Designer with 3 years of experience"

## 🔗 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Posts
- `GET /getallpost` - Get all posts (public feed)
- `POST /createpost` - Create new post (protected)
- `GET /getpost/:userId` - Get user's posts
- `GET /editpost/:postId` - Edit the existing post
- `GET /deletepost/:postId` - Delete post

### Users
- `GET /getUser/:id` - Get user profile
- `PUT /updateUser/:id` - Update user profile (protected)

## 🧪 Testing the Application

1. **Register a new account** or use demo credentials
2. **Login** to access the platform
3. **Create posts** from the home feed
4. **View profiles** by clicking on usernames
5. **Update your profile** bio and information
6. **Update your post** by clicking on Edit
7. **Delete your post** by clicking on Delete

## 📱 Screenshots & Features Demo

### Home Feed
- Clean, LinkedIn-inspired design
- Real-time post creation
- Author names and timestamps
- Responsive layout

### Profile Pages
- User information display
- Personal posts timeline
- Profile editing capabilities

### Authentication
- Secure login/register forms
- JWT token management
- Protected route handling

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration for frontend-backend communication