# Student Registration Project

## Overview

This is a MD college (not real )student Registration web application or portal built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to login as admin and  register new student,see information or the statics of register student with cool graph and cars and view register students details information.

## Features

-  authentication 
- register new student
- admin dashboard
- View registered students
- Responsive design
- RESTful API for backend functionality

## Technologies Used

- **Frontend**: React.js,react icon,framer motion
- **Backend**: Node.js, Express.js passportjwt, bcrypt,
- **Database**: MongoDB
- **Styling**: CSS
- **Authentication**: JWT (JSON Web Tokens)

## Installation Steps:

1. Install nodejs and npm on your device.
2. Clone the repository to your local system.
3. In the root folder, create a '.env' file.
4. Create a MongoDB server and get the MongoDB URI.
5. Add env variables as "MONGO_URI" to the .env file
6. Add a PORT variable and JWT_SECRET variable too.
7. Set PORT = 5000
8. Set JWT_SECRET as a string of your choice.


## Steps to run the project

1. Open up the command terminal from the root directory and type `npm start` to start the backend server.

2. Open another command prompt and type the following to start the frontend.  
`cd frontend`  
`npm run dev`

3. The application would be run on http://127.0.0.1:5173/

4. An admin user will be created in the database  

    username : admin 
    Password: password


### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Clone the Repository

```bash
git clone https://github.com/yourusername/student-registration.git
cd student-registration
