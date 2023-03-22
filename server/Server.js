const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use("/", require("./routes/bookRoute"));


app.get("/", (req, res) => {
    res.send("Express online");
})

app.listen(3001, () => {
    console.log("Express server is running on port 3001");
})

