// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors({
    origin : 'https://ubiquitous-meme-rjr69w544pvfwj46-5173.app.github.dev',
    credentials : true,
}));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000);