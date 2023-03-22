const express = require("express");
const router = express.Router();
const book = require("./../config");

router.get("/books", async (req, res) => {
    try {
        const snapshot = await book.get();
        const bookList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        res.send(bookList);
    } catch (err) {
        res.send(err)
    }
})

router.post("/books", async (req, res) => {
    try {
        await book.add(req.body)
        res.send({ msg: "book added" })
    } catch (err) {
        res.send(err)
    }
})

router.put("/books", async (req, res) => {
    try {
        await book.doc(req.body.id).update(req.body)
        res.send({ msg: "book updated" })
    } catch (err) {
        res.send(err)
    }
})

router.delete("/books/:id", async (req, res) => {
    try {
        await book.doc(req.params.id).delete();
    } catch (err) {
        res.send(err)
    }
})



module.exports = router;