const session = require("express-session");
const FileStore = require("session-file-store")(session);

const sessionData = session({
    secret: "0d2f999767cd77da792fab7105d2fdebc760472dfc3587d4ee98e33b8ab6081b",
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
});

module.exports = sessionData;
