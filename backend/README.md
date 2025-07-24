# Backend Project

This project is a backend application built with Node.js and Express, utilizing an SQLite database to manage users and posts. It provides functionality to list users with pagination, list posts of a user, and delete a post.

## Project Structure

```
backend-project
├── src
│   ├── db.js
│   ├── app.js
│   ├── controllers
│   │   ├── usersController.js
│   │   └── postsController.js
│   ├── routes
│   │   ├── users.js
│   │   └── posts.js
│   └── utils
│       └── pagination.js
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd backend-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Ensure you have the SQLite database (`data.db`) in the root of the project.**

4. **Run the application:**
   ```
   npm start
   ```

## API Usage

### List Users with Pagination

- **Endpoint:** `GET /users`
- **Query Parameters:**
  - `page`: The page number to retrieve (default is 1).
  - `limit`: The number of users per page (default is 10).

### List Posts of a User

- **Endpoint:** `GET /users/:userId/posts`
- **Path Parameters:**
  - `userId`: The ID of the user whose posts you want to retrieve.

### Delete a Post

- **Endpoint:** `DELETE /posts/:postId`
- **Path Parameters:**
  - `postId`: The ID of the post to delete.

## License

This project is licensed under the MIT License.