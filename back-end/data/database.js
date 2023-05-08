const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://EdvinasProgrammer:GoalTracking@goaltracking.dv2fgff.mongodb.net/';
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
    }
});
const User = mongoose.model('users', UserSchema);