const express = require("express");
const Note = require("../models/Note");
const rateLimit = require("express-rate-limit");

const router = express.Router();

/* ---------------- RATE LIMITER ---------------- */

const createLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Only 5 notes can be created per minute"
});

/* ---------------- CREATE NOTE ---------------- */

router.post("/", createLimiter, async (req, res) => {
    try {
        let { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }

        title = title.trim();
        content = content.trim();

        if (title === "" || content === "") {
            return res.status(400).json({ message: "Empty strings not allowed" });
        }

        const note = new Note({ title, content });
        await note.save();

        res.status(201).json({
            message: "Note created",
            note
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- GET ALL NOTES ---------------- */

router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ updatedAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- UPDATE NOTE ---------------- */

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let { title, content } = req.body;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        let changed = false;

        if (title !== undefined) {
            title = title.trim();
            if (title !== note.title) {
                note.title = title;
                changed = true;
            }
        }

        if (content !== undefined) {
            content = content.trim();
            if (content !== note.content) {
                note.content = content;
                changed = true;
            }
        }

        if (!changed) {
            return res.json({ message: "No changes detected" });
        }

        await note.save();
        res.json({ message: "Note updated", note });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- SEARCH NOTES ---------------- */

router.get("/search", async (req, res) => {
    try {
        let q = req.query.q;

        if (!q || q.trim() === "") {
            return res.status(400).json({ message: "Query cannot be empty" });
        }

        q = q.trim();

        const notes = await Note.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } }
            ]
        });

        res.json(notes);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
