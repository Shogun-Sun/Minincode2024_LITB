const express = require("express");
const app = express();
const router = require("./server_modules/pageRouter");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(router);

 
app.listen(3000, () => {
    console.log("Server запущен");
})