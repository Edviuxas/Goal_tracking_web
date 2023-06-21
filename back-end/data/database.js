require('dotenv').config();
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
}).then(() => {
    console.log('connected to DB');
}).catch((e) => console.error(e));

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    refreshToken: String,
});

const OkrGoalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    okrName: {
        type: String,
        required: true,
    },
    okrFinishBy: {
        type: String,
        required: true,
    },
    okrDifficulty: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
    }
})

const GoalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    goalName: {
        type: String,
        required: true,
    },
    finishBy: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    goalType: {
        type: String,
        required: true,
    },
    okrGoals: [OkrGoalSchema],
});

const Goal = mongoose.model('goals', GoalSchema);
const User = mongoose.model('users', UserSchema);