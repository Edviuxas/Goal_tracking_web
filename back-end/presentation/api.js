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

const User = mongoose.model('users');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
            bcrypt.compare(password, user.password, (err, resp) => {
                if (err) {
                    res.status(404).json({ error: 'something went wrong' });
                }
                if (resp) {
                    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
                    console.log(`found user ${user.firstName}`);
                    res.status(200).json({
                        email: user.email,
                        accessToken: accessToken,
                    });
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

module.exports.listen = (port = '12345') => new Promise((resolve) => {
    console.log(`Starting server on port ${port}`);
    server = http.createServer(app);
    server.listen(port);
    resolve();
});

module.exports.close = () => new Promise((resolve) => server.close(resolve));