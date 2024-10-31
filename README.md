# 📚 MD COLLEGE Project

## Overview

MD COLLEGE Project is a web application designed for managing student registrations at a college called MD (not real). Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this application allows users to log in as admin, register new students, view registration statistics with engaging graphs and cards, and access detailed information about registered students.

## Features

- 🔒 **User Authentication**: Secure login for admins.
- ✍️ **Student Registration**: Easily register new students.
- 📊 **Admin Dashboard**: View registered students and statistics.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.
- 🌐 **RESTful API**: Full backend functionality for seamless data interaction.

## Technologies Used

- **Frontend**: 
  - ⚛️ React.js
  - 📦 React Icons
  - 🎨 Framer Motion
  - 📦 react-chartjs-2
  - 🔑 yup
- **Backend**: 
  - 💻 Node.js
  - 🖥️ Express.js
- **Database**: 🗄️ MongoDB
- **Styling**: 🎨 CSS
- **Authentication & Security**: 🔑 Passport, JSON Web Tokens (JWT), Bcrypt

## API Documentation



## Live Deployment

You can access the deployed project here: [MD College Live](https://dreamy-sprite-be3c9d.netlify.app/).

## Installation Steps

1. **Install Node.js and npm** on your device.
2. **Clone the repository** to your local machine:
    ```bash
    git clone https://github.com/yourusername/student-registration.git
    cd student-registration
    ```
3. **Create a `.env` file** in the root directory.
4. **Set up a MongoDB server** (local installation or MongoDB Atlas) and obtain the MongoDB URI.
5. **Add environment variables** to the `.env` file:
    - `MONGO_URI`: Your MongoDB connection string.
    - `PORT`: Set to `5000`.
    - `JWT_SECRET`: A secure string of your choice.
6. **Install dependencies** for both frontend and backend:
    ```bash
    npm install
    cd frontend
    npm install
    ```

## Running the Project

1. **Start the backend server**:
    ```bash
    npm start
    ```
2. **Start the frontend application**:
    ```bash
    cd frontend
    npm run dev
    ```
3. **Access the application** at [http://127.0.0.1:5173/].

4. **Admin User Credentials** (created in the database):
    - **Username**: `admin`
    - **Password**: `password`

### Prerequisites

- 🖥️ **Node.js**: Version 14 or higher.
- 🗄️ **MongoDB**: Local installation or a MongoDB Atlas account.

## License

📄 This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
