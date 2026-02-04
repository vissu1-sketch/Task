# Task
# Notes Management REST API

A minimal backend REST API for managing notes with basic intelligence features such as validation, smart search, partial updates, and rate limiting.

--------------------------------------------------

FEATURES

- Create notes with validation
- Get all notes sorted by latest update
- Update notes (partial updates allowed)
- Smart search in title and content
- Rate limiting for note creation (5 per minute)

--------------------------------------------------

TECH STACK

- Node.js  
- Express.js  
- MongoDB (Atlas / Local)  
- Mongoose  

--------------------------------------------------

PROJECT STRUCTURE

notes-api
│
├── models
│   └── Note.js
│
├── routes
│   └── notes.js
│
├── server.js
├── package.json
└── README.md

--------------------------------------------------

INSTALLATION & SETUP

1) Clone Repository

git clone https://github.com/your-username/notes-api.git  
cd notes-api  

2) Install Dependencies

npm install  

3) Configure Database

Create a file named .env in root folder:

MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/notesdb  
PORT=3000  

4) Run Server

npm run dev  

Server runs at:

http://localhost:3000  

--------------------------------------------------

API ENDPOINTS

Create Note  
POST /notes  

Body:

{
  "title": "Meeting Notes",
  "content": "Discussed hiring plan and deadlines"
}

-----------------------------

Get All Notes  
GET /notes  

-----------------------------

Update Note  
PUT /notes/:id  

Body:

{
  "content": "Updated hiring plan"
}

-----------------------------

Search Notes  
GET /notes/search?q=meeting  

--------------------------------------------------

VALIDATION RULES

- Title and content required  
- Extra spaces trimmed  
- Empty strings rejected  

--------------------------------------------------

RATE LIMITING

- Maximum 5 note creations per minute  

--------------------------------------------------

TESTING

Use Postman or Thunder Client.

--------------------------------------------------

