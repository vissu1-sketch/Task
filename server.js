const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/notesdb")

    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Routes
const noteRoutes = require("./routes/notes");
app.use("/notes", noteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
