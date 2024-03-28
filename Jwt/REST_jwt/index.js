require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const app = express();
app.use(bodyParser.json());
const User = require('./user')
const { verifyToken } = require('./middleware/verifyToken')
const { authenticateUser } = require('./middleware/auth')
let isAdmin = 0;

//Create a new user.
app.post('/api/users', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//login of user with authentication
app.post("/api/login", authenticateUser, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user.role == "admin") {
        isAdmin = 1;
    }
    res.status(200).json({ authenticateUser });
});

//Retrieve all users.
app.get('/api/users', verifyToken, async (req, res) => {
    if (isAdmin == 1) {
        const authData = await jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET);
        const users = await User.find({}, { username: 1, role: 1, _id: 0 });
        try {
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }
    } else {
        console.log(isAdmin)
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if (err) {
                res.send({ message: "invalid or expired token" })
            } else {
                res.send({ Data: "your profile", authData });
            }
        })
    }
})

//Retrieve a user by ID.
app.get('/api/users/:id', verifyToken, async (req, res) => {
    if (isAdmin == 1) {
        try {
            jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    console.log("invalid or token expire");
                } else {
                    const userId = req.params.id;
                    console.log(userId);
                    const user = await User.findOne({ _id: userId });
                    if (!user) {
                        return res.send({ message: "User not found with this id!" });
                    } else {

                        res.json(user);
                    }
                }
            })
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }
    } else {
        res.send("you don't have access to show detail")
    }


})

//Update a user's information.
app.put('/api/users/:id', verifyToken, async (req, res) => {
    if (isAdmin == 1) {
        try {
            jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    console.log("error something")

                } else {
                    const userId = req.params.id;
                    console.log(userId)
                    await User.findByIdAndUpdate(userId, { username: req.body.username, password: req.body.password }).then(async user => {
                        await user.save();
                        if (!user) {
                            res.send("not a user");
                            return;
                        } else {
                            res.send(`updated succesfully `)
                        }
                    })
                }
            })
        } catch (error) {
            res.status(500).json({ message: "server error" })
        }
    } else {
        res.send("not have access")
    }


})

//Delete a user by ID.
app.delete('/api/users/:id', verifyToken, async (req, res) => {
    if (isAdmin == 1) {
        try {
            jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    console.log("invalid or token expire")
                } else {
                    const userId = req.params.id;
                    const user = await User.deleteOne({ _id: userId });
                    console.log(user);
                    if (user.deletedCount === 0) {
                        res.status(200).send({ message: "User not found!" });
                    } else {

                        res.send("deleted !")
                    }
                }
            })
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }
    } else {
        res.send("not have access to delete")
    }

})

app.listen(3000, () => {
    console.log("running...")
})