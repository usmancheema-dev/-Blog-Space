                                                                🚀✦Blog Space

A simple Blog backend API built with Node.js and Express.

---

 📌 Features

* RESTful API design
* CRUD operations (Create, Read, Update, Delete)
* Environment-based configuration
* Error handling middleware

---

 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB

---

 ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/usmancheema-dev/-Blog-Space.git
cd -Blog-Space
```

Install dependencies:

```bash
npm install
```

---

 🔐 Environment Variables

Create a `.env` file in the root:

```env
PORT=2000
DB_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

 ▶️ Running the Project

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

---

 📡 API Endpoints

 Auth

| Method | Route            | Description   |
| ------ | ---------------- | ------------- |
| POST   | /api/auth/login  | Login user    |
| POST   | /api/auth/signup | Register user |

 Users (Protected)

| Method | Route          | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/users     | Get all users  |
| GET    | /api/users/:id | Get user by ID |

---

 🔒 Authentication

Authentication will be added soon 😁

---

 ❗ Error Handling

Standard HTTP status codes are used:

200 → Success
400 → Bad Request
401 → Unauthorized
403 → Forbidden
500 → Server Error

---

 🌍 Deployment

Backend deployed on: 
Example:

```text
https://blog-space-production.up.railway.app/
```

---

 🧪 Testing

You can test endpoints using:

* Postman
* VS Code

---

 📄 License

This project is open-source and free to use.

---

 👨‍💻 Author

Your Name
GitHub: [https://github.com/usmancheema-dev/-Blog-Space]
