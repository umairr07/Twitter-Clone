# Twitter(X) Clone - Backend Service

Welcome to the Twitter(X) Clone backend service! This project provides a comprehensive backend solution for a Twitter-like application. It features user authentication, profile management, post creation, and notification services, all built with modern web technologies.

## 🌐 Hosted on Render

The backend service is hosted on Render. You can access the live API endpoints at: [https://twitter-clone-qtw8.onrender.com/](https://twitter-clone-qtw8.onrender.com/)

## 🛠️ Tech Stack

- **Node.js** 🟢: JavaScript runtime for server-side operations.
- **Express** 🚀: Web application framework for Node.js.
- **MongoDB** 💾: NoSQL database for storing user data, posts, and notifications.
- **Cloudinary** ☁️: Media management service for handling image uploads and transformations.
- **dotenv** 📦: Module to load environment variables.

## 🔐 Authentication & Authorization

The backend service includes robust authentication and authorization mechanisms:

- **Authentication**: Users must sign up and log in to access protected resources. JWT (JSON Web Tokens) are used to authenticate users and manage sessions.
- **Authorization**: Certain API endpoints require specific user roles or permissions. Only authenticated users can create posts, follow/unfollow others, and access their own notifications.

## 📜 API Documentation

### User Authentication APIs

- **Signup**: [POST /api/v1/auth/signup](https://twitter-clone-qtw8.onrender.com/api/v1/auth/signup)
- **Login**: [POST /api/v1/auth/login](https://twitter-clone-qtw8.onrender.com/api/v1/auth/login)
- **Logout**: [POST /api/v1/auth/logout/:id](https://twitter-clone-qtw8.onrender.com/api/v1/auth/logout/:id)

### User APIs

- **User Profile**: [GET /api/v1/users/profile/:username](https://twitter-clone-qtw8.onrender.com/api/v1/users/profile/:username)
- **Suggested Users**: [GET /api/v1/users/suggested](https://twitter-clone-qtw8.onrender.com/api/v1/users/suggested)
- **Follow/Unfollow Users**: [POST /api/v1/users/profile/:id](https://twitter-clone-qtw8.onrender.com/api/v1/users/profile/:id)
- **Update Profile**: [POST /api/v1/users/update](https://twitter-clone-qtw8.onrender.com/api/v1/users/update)

### Post/Tweets APIs

- **Create Post**: [POST /api/v1/posts/create](https://twitter-clone-qtw8.onrender.com/api/v1/posts/create)
- **Delete Post**: [DELETE /api/v1/posts/:id](https://twitter-clone-qtw8.onrender.com/api/v1/posts/:id)
- **Like/Unlike Post**: [POST /api/v1/posts/like/:id](https://twitter-clone-qtw8.onrender.com/api/v1/posts/like/:id)
- **Comment on Post**: [POST /api/v1/posts/comment/:id](https://twitter-clone-qtw8.onrender.com/api/v1/posts/comment/:id)
- **Get All Posts**: [GET /api/v1/posts/all](https://twitter-clone-qtw8.onrender.com/api/v1/posts/all)
- **Get User Posts**: [GET /api/v1/posts/userPosts/:username](https://twitter-clone-qtw8.onrender.com/api/v1/posts/userPosts/:username)
- **Get Following Posts**: [GET /api/v1/posts/followingPosts](https://twitter-clone-qtw8.onrender.com/api/v1/posts/followingPosts)

### Notification APIs

- **All Notifications**: [GET /api/v1/notifications/all](https://twitter-clone-qtw8.onrender.com/api/v1/notifications/all)
- **Delete All Notifications**: [DELETE /api/v1/notifications/delete](https://twitter-clone-qtw8.onrender.com/api/v1/notifications/delete)

## 🚀 Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in a `.env` file.
4. Start the server: `npm start`.

## 💡 Notes

- Ensure you have a Cloudinary account and configure it with the required environment variables (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
- For a detailed API usage guide, refer to the documentation provided.
- JWT authentication is used for secure API access. Ensure to include the `Authorization` header with your requests.

Happy coding! 🎉
