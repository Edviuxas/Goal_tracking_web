require('dotenv').config();
const http = require('http');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const goalTracking = require('../data/GoalTracking');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../data/database');

const Goal = mongoose.model('goals');
const User = mongoose.model('users');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};
  
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET);
};

app.post("/api/refresh", async (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.refreshToken;
    const userId = req.body.id;
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    const dbUser = await User.findOne( {_id: userId} );
    if (!dbUser)
        return res.status(403).json("user not found in database");
    if (!dbUser.jwtRefreshTokens.includes(refreshToken))
        return res.status(403).json("Refresh token is not valid!");
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      err && console.log(err);
      dbUser.jwtRefreshTokens = dbUser.jwtRefreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      dbUser.jwtRefreshTokens.push(newRefreshToken);
      await dbUser.save();
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
    //if everything is ok, create new access token, refresh token and send to user
  });

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const currUser = await User.findOne({ email });

        if (currUser)
            return res.json({ error: 'user already exists'});

        await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
        });
        res.send({ status: 'ok' });
    } catch (e) {
        res.send({ status: 'error', error: e.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // const encryptedPassword = await bcrypt.hash(password, 10);
        // console.log(encryptedPassword);
        const user = await User.findOne({ email })

        if (user) {
            bcrypt.compare(password, user.password, async (err, resp) => {
                if (err) {
                    res.status(404).json({ error: 'something went wrong' });
                }
                if (resp) {
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    console.log(`found user ${user.firstName}`);
                    res.status(200).json({
                        id: user._id,
                        email: user.email,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                    user.jwtRefreshTokens.push(refreshToken);
                    await user.save();
                } else {
                    res.status(404).json({ error: 'password is incorrect' });
                }
            });
        } else {
            console.log('did not find user');
            res.status(404).json({ error: 'did not find user' });
        }
    } catch (e) {
        res.send({ status: 'error', error: e.message });
    }
});

app.post('/goal', async (req, res) => {
    const { id, createdBy, goalName, finishBy, difficulty, goalType } = req.body;
    try {
        await Goal.create({
            id,
            createdBy,
            goalName,
            finishBy,
            difficulty,
            goalType,
        });
        res.status(200).json({ status: 'ok' });
    } catch (e) {
        console.log(e.message);
        res.send({ status: 'error', error: e.message });
    }
});

app.delete('/goal/:id', async (req, res) => {
    const goalId = req.params.id;
    try {
        await Goal.deleteOne({ id: goalId });
        res.status(200).json({ status: 'ok' });
    } catch (e) {
        res.send({ status: 'error', error: e.message});
    }
});

app.get('/goals', async (req, res) => {
    // const userId = req.body.id;
    // console.log(`userId: ${userId}`);
    try {
        const goalsList = await Goal.find({});
        console.log('goals list:');
        console.log(goalsList);
        res.status(200).json(goalsList);        
    } catch (e) {
        res.send({ status: 'error', error: e.message });
    }
});

module.exports.listen = (port = '12345') => new Promise((resolve) => {
    console.log(`Starting server on port ${port}`);
    server = http.createServer(app);
    server.listen(port);
    resolve();
});

module.exports.close = () => new Promise((resolve) => server.close(resolve));