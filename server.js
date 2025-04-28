require("dotenv").config();
const app = require("express")();
const port = 3456;
require("./dbconn").connectDb();
const users = require("./users")
const router = app.router

router.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

router.get("/", (req, res) => {
    res.send("Connection On")
});

router.get("/users", (req, res) => {
    users.readAll().then(result => {
        res.send(result);
    })
});


app.use('/', router)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});