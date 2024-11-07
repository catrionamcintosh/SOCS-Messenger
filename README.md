# My MERN Web Application

Messaging platform with multiple boards and channels, user login, and admin roles

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Built With](#built-with)
7. [License](#license)

---

## Getting Started

These instructions will guide you through setting up the project locally for development and testing.

### Prerequisites

Make sure you have the following software installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (recommended: version 14 or higher)
- **npm**: Node Package Manager (included with Node.js)
- **MongoDB**: Set up a local MongoDB instance or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Verify your installations:

```bash
node -v
npm -v
```


### Installation

1. **Clone the Repository**

   First, clone the repository to your local machine:

  ```bash
  git clone https://github.com/catrionamcintosh/SOCS-Messenger.git
  ```

2. **Navigate to the Project Directory**

  Go into your project folder:
  ```bash
  cd SOCS-Messenger
  ```

3. **Install Backend Dependencies**

  Navigate to the `server` folder and install the necessary dependencies:
  ```bash
  cd server npm install
  ```

4. **Install Frontend Dependencies**

  Then, move to the `client` folder and install the frontend dependencies:

  ```bash
  cd ../client npm install
  ```

## Running the Application

To run the application locally, follow these steps:

1. **Start the Backend Server**

In the `server` folder, run the following command to start the backend:
  ```bash
  node server.js
  ```

This will start the server on the port `5000`.

2. **Start the Frontend**

In the `client` folder, run the following command to start the frontend:

  ```bash
  npm start
  ```
## Built With

- **Node.js**: JavaScript runtime used for the backend.
- **Express.js**: Web framework for Node.js.
- **React.js**: Frontend framework for building user interfaces.
- **MongoDB**: NoSQL database used for storing data.
