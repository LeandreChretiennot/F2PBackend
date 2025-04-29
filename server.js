require("dotenv").config();
const app = require("express")();
const port = 3456;
const router = app.router

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const connectionString = process.env.ATLAS_URL || "";
const crudUser = require("./crud/user")

router.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

router.get("/", (req, res) => {
    res.send("Connection On")
});

//#region user crud
router.post("/user", (req, res) => {
    crudUser.create(req.body.pseudo, req.body.password)
        .catch(err => {
            res.send(err);
        })
        .then(result => {
            res.send(result);
        });
});
router.get("/user", (req, res) => {
    crudUser.readOne(req.query).then(result => {
        console.log(result);
        res.send(result);
    });
});
router.get("/login", (req, res) => {
    if (!req.query.pseudo || !req.query.password)
        res.send();
    crudUser.readOne(req.query).then(result => {
        // console.log(result);
        res.send(result);
    });
})
router.get("/users", (req, res) => {
    crudUser.readAll().then(result => {
        res.send(result);
    });
});
//#endregion

app.use('/', router)
app.listen(port, async () => {
    await mongoose.connect(connectionString);
    console.log(`Example app listening on port ${port}!`);
});