# School Library Management API

## Description

This API provides a backend service for managing a school library system. It allows for CRUD operations on books, authors, students, and attendants, as well as handling book borrowing and returns. Built with Node.js, Express, and MongoDB.

## Features

- Manage books (add, update, delete, list, borrow, return, search)
- Manage authors (add, update, delete, list)
- Manage students (add, update, delete, list)
- Manage attendants (add, list)
- Handle book borrowing and returns

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Postman (for API testing)

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/school-library-management-api.git
cd school-library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/school-library
```

### 4. Start MongoDB

Ensure MongoDB is running locally or update the URI for a cloud instance.

### 5. Run the Application

```bash
npm start
```

The server will start on `http://localhost:3000`.

### 6. Test the API

Use Postman to test the endpoints as documented below.

## API Documentation

### Base URL

`http://localhost:3000/api`

### Endpoints

#### Authors

##### 1. Get All Authors

- **Method:** GET
- **URL:** `/authors`
- **Response (200):**
  ```json
  [
    {
      "id": "author-id",
      "name": "Author Name",
      "bio": "Author biography"
    }
  ]
  ```

##### 2. Get One Author

- **Method:** GET
- **URL:** `/authors/:id`
- **Response (200):**
  ```json
  {
    "id": "author-id",
    "name": "Author Name",
    "bio": "Author biography"
  }
  ```

##### 3. Create New Author

- **Method:** POST
- **URL:** `/authors`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "New Author",
    "bio": "Author biography"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Author created successfully",
    "author": {
      "id": "author-id",
      "name": "New Author",
      "bio": "Author biography"
    }
  }
  ```

##### 4. Update Author

- **Method:** PUT
- **URL:** `/authors/:id`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "Updated Author",
    "bio": "Updated biography"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Author updated successfully",
    "author": {
      "id": "author-id",
      "name": "Updated Author",
      "bio": "Updated biography"
    }
  }
  ```

##### 5. Delete Author

- **Method:** DELETE
- **URL:** `/authors/:id`
- **Response (200):**
  ```json
  {
    "message": "Author deleted successfully"
  }
  ```

#### Attendants

##### 1. Get All Attendants

- **Method:** GET
- **URL:** `/attendants`
- **Response (200):**
  ```json
  [
    {
      "id": "attendant-id",
      "name": "Attendant Name",
      "role": "Librarian"
    }
  ]
  ```

##### 2. Create New Attendant

- **Method:** POST
- **URL:** `/attendants`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "New Attendant",
    "role": "Librarian"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Attendant created successfully",
    "attendant": {
      "id": "attendant-id",
      "name": "New Attendant",
      "role": "Librarian"
    }
  }
  ```

#### Books

##### 1. Get All Books

- **Method:** GET
- **URL:** `/books`
- **Response (200):**
  ```json
  [
    {
      "id": "book-id",
      "title": "Book Title",
      "author": "Author Name",
      "isbn": "1234567890",
      "available": true
    }
  ]
  ```

##### 2. Get One Book

- **Method:** GET
- **URL:** `/books/:id`
- **Response (200):**
  ```json
  {
    "id": "book-id",
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "1234567890",
    "available": true
  }
  ```

##### 3. Create New Book

- **Method:** POST
- **URL:** `/books`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "title": "New Book",
    "author": "Author Name",
    "isbn": "0987654321"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Book created successfully",
    "book": {
      "id": "book-id",
      "title": "New Book",
      "author": "Author Name",
      "isbn": "0987654321",
      "available": true
    }
  }
  ```

##### 4. Borrow Book

- **Method:** POST
- **URL:** `/books/:id/borrow`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "studentId": "student-id"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Book borrowed successfully",
    "borrowRecord": {
      "id": "record-id",
      "bookId": "book-id",
      "studentId": "student-id",
      "borrowDate": "2023-10-01",
      "returnDate": null
    }
  }
  ```

##### 5. Return Book

- **Method:** POST
- **URL:** `/books/:id/return`
- **Response (200):**
  ```json
  {
    "message": "Book returned successfully",
    "borrowRecord": {
      "id": "record-id",
      "bookId": "book-id",
      "studentId": "student-id",
      "borrowDate": "2023-10-01",
      "returnDate": "2023-10-15"
    }
  }
  ```

##### 6. Search Book by Title or Author

- **Method:** GET
- **URL:** `/books/search/book?query=search-term`
- **Response (200):**
  ```json
  [
    {
      "id": "book-id",
      "title": "Book Title",
      "author": "Author Name",
      "isbn": "1234567890",
      "available": true
    }
  ]
  ```

##### 7. Update Book

- **Method:** PUT
- **URL:** `/books/:id`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "available": false
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Book updated successfully",
    "book": {
      "id": "book-id",
      "title": "Updated Title",
      "author": "Author Name",
      "isbn": "0987654321",
      "available": false
    }
  }
  ```

##### 8. Delete Book

- **Method:** DELETE
- **URL:** `/books/:id`
- **Response (200):**
  ```json
  {
    "message": "Book deleted successfully"
  }
  ```

#### Students

##### 1. Get All Students

- **Method:** GET
- **URL:** `/students`
- **Response (200):**
  ```json
  [
    {
      "id": "student-id",
      "name": "Student Name",
      "grade": "10th Grade"
    }
  ]
  ```

##### 2. Get One Student

- **Method:** GET
- **URL:** `/students/:id`
- **Response (200):**
  ```json
  {
    "id": "student-id",
    "name": "Student Name",
    "grade": "10th Grade"
  }
  ```

##### 3. Create New Student

- **Method:** POST
- **URL:** `/students`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "New Student",
    "grade": "10th Grade"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Student created successfully",
    "student": {
      "id": "student-id",
      "name": "New Student",
      "grade": "10th Grade"
    }
  }
  ```

##### 4. Update Student

- **Method:** PUT
- **URL:** `/students/:id`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "name": "Updated Student",
    "grade": "11th Grade"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Student updated successfully",
    "student": {
      "id": "student-id",
      "name": "Updated Student",
      "grade": "11th Grade"
    }
  }
  ```

##### 5. Delete Student

- **Method:** DELETE
- **URL:** `/students/:id`
- **Response (200):**
  ```json
  {
    "message": "Student deleted successfully"
  }
  ```

## Error Handling

- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
