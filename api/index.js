const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const User = require("./models/User")
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")
const cookieParser = require("cookie-parser")
const PORT = 5000 || process.env.PORT;


connectDb();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password: bcrypt.hashSync(password, 10) });
        res.json(user)
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        const passOk = await bcrypt.compareSync(password, user.password);
        if (passOk) {
            const token = jwt.sign({ username, id: user.id }, process.env.ACCESS_TOKEN)
            if (token) {
                res.cookie("token", token).json({
                    id:user._id,
                    username
                });
            }
            else {
                res.status(401);
                throw new Error("email or password is incorrect");
            }
        }
        else {
            res.status(400).json("wrong credentitals");
        }
    }
    catch (error) {
        res.status(400).json(error.message);
    }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.ACCESS_TOKEN, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })
})

app.post("/logout", (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

// username=blog
//password-> blogapp