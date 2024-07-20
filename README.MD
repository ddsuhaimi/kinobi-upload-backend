# kinobi-upload-backend

## Demo

[Demo](https://kinobi-upload-backend.onrender.com)

## Step 1: Environment variables

Create `.env` file on the root of this repository

```
PORT=5001
FRONTEND_URL="http://localhost:3000"
```

# File Upload and Management API

## Overview

This project is an Express.js application that provides API endpoints to upload files to a local directory and retrieve the list of uploaded files. It includes error handling and a rate limiter for the upload endpoint.

## Features

- Upload files to a local directory.
- Retrieve a list of uploaded files, sorted by creation date.
- Rate limiting to prevent abuse of the upload endpoint.
- Custom error handling.

## Prerequisites

- Node.js 20
- npm (Node Package Manager)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

```

### Upload File

#### POST /files

Uploads a file to the server.

- **URL:** `/files`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: multipart/form-data`
- **Body:**
  - `file`: The file to be uploaded.
- **Rate Limit:** 15 requests per minute per IP.

**Response:**

- **Success:** 200 OK

  - ```json
    {
      "message": "File uploaded successfully",
      "file": {
        "fieldname": "file",
        "originalname": "example.jpg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "destination": "uploads/",
        "filename": "1625239075627.jpg",
        "path": "uploads/1625239075627.jpg",
        "size": 1024
      }
    }
    ```

- **Error:** 400 Bad Request

  - ```json
    {
      "error": "No file uploaded"
    }
    ```

- **Error:** 500 Internal Server Error
  - ```json
    {
      "error": "Something went wrong!"
    }
    ```

### Get File List

#### GET /files

Retrieves a list of uploaded files, sorted by creation date.

- **URL:** `/files`
- **Method:** `GET`

**Response:**

- **Success:** 200 OK

  - ```json
    {
      "files": [
        {
          "name": "1625239075627.jpg",
          "createdAt": "2021-07-02T12:17:55.627Z"
        },
        {
          "name": "1625239080000.jpg",
          "createdAt": "2021-07-02T12:18:00.000Z"
        }
      ]
    }
    ```

- **Error:** 500 Internal Server Error
  - ```json
    {
      "error": "Something went wrong!"
    }
    ```

## Rate Limiting

The upload endpoint has a rate limiter to prevent abuse. Each IP address is limited to 20 requests per minute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
