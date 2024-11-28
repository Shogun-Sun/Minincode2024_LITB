const express = require("express");
const path = require("path"); 
const app = express();
const router = require("./public/pageRouter");

app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.listen(3000, () => {
    console.log("Server запущен");
});
