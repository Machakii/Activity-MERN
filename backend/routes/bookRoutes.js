const express = require("express");
const router = express.Router();
const Books = require("../models/Books");

// ADD books
router.post("/add", async (req, res) => {
  try {
    const newBooks = new Books(req.body);
    const savedBooks = await newBooks.save();
    res.status(201).json(savedBooks);
  } catch (err) {
    console.error("Error adding books:", err);
    res.status(500).json({ error: "Failed to add books" });
  }
});

// GET all books
router.get("/all", async (req, res) => {
  try {
    const Books = await Books.find();
    res.json(Books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});


// UPDATE books
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedBooks = await Books.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    if (!updatedBooks)
      return res.status(404).json({ error: "Books not found" });
    res.json(updatedBooks);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// DELETE books
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

module.exports = router;