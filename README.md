# Northcoders News API
*<small>This API was crafted by Yuliia Yakubiv for learning purposes as part of the Northcoders bootcamp, serving as a practical project to reinforce skills and knowledge gained during trainig.</small>*


Welcome to the **NC News API! This API provides access to articles, comments, and other data for the NC News website.

This project utilizes a PostgreSQL (PSQL) database, and interactions with the database are facilitated through the node-postgres library. The implementation is primarily done in JavaScript using Node.js, and the application is built with the Express framework. For testing purposes, Supertest is employed to ensure the reliability and functionality of the API. PSQL DB hosted on ElephantSQL and API on RENDER 

## Getting Started

To use the NC News API, you'll need to make HTTP requests to the provided endpoints. 

## Base URL

The base URL for the NC News API is:  https://back-end-nc-news.onrender.com/api

## Available Endpoints

### Main

- `GET /api` : Get a list of available endpoints


### Account

- `POST /api/signup` : Add a new user
- `POST /api/login` : User login authentication

### Articles

- `GET /api/articles`: Get a list of all articles.
- `GET /api/articles/:article_id`: Get details of a specific article.
- `GET /api/articles/:article_id/comments`: Get comments for a specific article.
- `POST /api/articles/:article_id/comments`: Add a new comment to an article..
- `PATCH /api/articles/:article_id`: Make changes on likes on a specific article.


### Topics

- `GET /api/topics`: Get a list of all topics.


### Comments

- `GET /api/comments`: Get a list of all comments available.
- `GET /api/articles/:article_id/comments`: Get comments for a specific article.
- `POST /api/articles/:article_id/comments`: Add a new comment to an article.
- `GET api/comments/:comment_id`: Get a single comment.
- `DELETE /api/comments/:comment_id`: Delete a comment.

## Examples

```json
{
  "topics": [
    {
      "slug": "football",
      "description": "Footie!"
    },
    {
      "slug": "coding",
      "description": "Programming and development"
    },
    // ... other topics
  ]
}
```
## HTTP Status Codes

### 200 OK
- Successful request.
- Returned for successful GET, POST, PUT, or DELETE operations.

### 201 Created
- Resource successfully created.
- Returned after a successful POST request that creates a new resource.

### 400 Bad Request
- Invalid request or missing parameters.
- Check your request payload or query parameters.

### 404 Not Found
- Requested resource not found.
- Ensure the requested endpoint or resource exists.

### 409 Conflict
- Conflict with the current state of the resource.
- Typically occurs during resource creation when there's a conflict with an existing resource.

### 422 Unprocessable Entity
- Validation error or invalid data.
- The server understands the request but cannot process it due to semantic errors.

### 500 Internal Server Error
- Unexpected server error.
- The server encountered an error while processing the request.
