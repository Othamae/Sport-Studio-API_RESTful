
# Sport Studio API

This API allows you to manage classes, instructors, and students for a sports studio. The API is built using RESTful principles and conforms to OpenAPI version 3.0.0 specifications.

## Installation

To run the API on your local machine, follow these steps:

1. Clone the repository - https://github.com/Othamae/Sport-Studio-API_RESTful.git
2. Install dependencies using `npm install`
3. Run the API using `npm start`

The API will run locally on `http://localhost:${process.env.PORT}`


## Swagger Documentation 

https://sport-studio-apirestful-production.up.railway.app/api/doc/



## Endpoints


There are four categories of endpoints:

1. Classes
2. Instructors
3. Students
4. User

Each endpoint can be accessed using HTTP requests, and must be authenticated using a JWT token provided during the login process.


### Classes

The following endpoints are available for classes:

- `GET /classes`: retrieve all classes
- `GET /classes/:id`: retrieve a specific class by ID
- `POST /classes`: create a new class
- `PUT /classes/:id`: update an existing class
- `DELETE /classes/:id`: delete a specific class by ID

#### Production - https://sport-studio-apirestful-production.up.railway.app/api/classes 

### Instructors

The following endpoints are available for instructors:

- `GET /instructors`: retrieve all instructors
- `GET /instructors/:id`: retrieve a specific instructor by ID
- `PUT /instructors/:id`: update an existing instructor
- `DELETE /instructors/:id`: delete a specific instructor by ID

#### Production - https://sport-studio-apirestful-production.up.railway.app/api/instructors 

### Students

The following endpoints are available for students:

- `GET /students`: retrieve all students
- `GET /students/:id`: retrieve a specific student by ID
- `PUT /students/:id`: update an existing student
- `DELETE /students/:id`: delete a specific student by ID

#### Production - https://sport-studio-apirestful-production.up.railway.app/api/students 

### Users

The following endpoints are available for students:

- `POST /user/login`: logs user into the system
- `POST /user/register`: register user into the system

## Request and Response Examples

Here are some examples of requests and responses for each endpoint.

### GET /classes

Request:

```http
GET /classes HTTP/1.1
Authorization: Bearer JWT_TOKEN
```

Response:

```json
[
    {
        "_id": "60e7afbca095f111cc0adb48",
        "name": "Yoga",
        "time": "10:00",
        "instructor": {
            "name": "instructor1",
            "email": "instructor1@email.com"
        },
        "level": "adult",
        "capacity": 20,
        "duration": {
            "lections": 1,
            "start": "14/07/2021",
            "end": "14/07/2021"
        }
    },
    {
        "_id": "60e7b034a095f111cc0adb4b",
        "name": "Boxing",
        "time": "14:00",
        "instructor": {
            "name": "instructor2",
            "email": "instructor2@email.com"
        },
        "level": "adult",
        "capacity": 15,
        "duration": {
            "lections": 6,
            "start": "14/07/2021",
            "end": "20/08/2021"
        }
    }
]
```

### POST /instructors

Request:

```http
POST /instructors HTTP/1.1
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "password",
    "role": "instructor",
    "ageGroup": "adult",
    "isAdmin": true
}
```

Response:

```json
{
    "_id": "60e7b6d1a095f111cc0adb57",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "password",
    "role": "instructor",
    "ageGroup": "adult"
}
```

## Data Model

The API is based on three main data objects: classes, instructors, and students. Here is an example schema for each object:

### Class

```json
{
    "_id": "string",
    "name": "string",
    "time": "string",
    "instructor": "string",
    "level": {
        "student": "string"
    },
    "capacity": "number",
    "duration": {
        "lections": "number",
        "start": "string",
        "end": "string"
    }
}
```

### Instructor

```json
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "isAdmin": true
}
```

### Student

```json
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "ageGroup": "string",
    "isAdmin": false
}
```

## Security

The API requires authentication using a JWT token, which must be provided in the `Authorization` header of each request. The token is obtained during the login process and is valid for a limited time period.