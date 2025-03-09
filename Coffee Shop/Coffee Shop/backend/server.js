// Coffee Shop - Backend (server.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = 5000;
const JWT_SECRET = 'coffeeshopsecret';

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const MenuSchema = new mongoose.Schema({
    name: String,
    price: Number
});
const Menu = mongoose.model('Menu', MenuSchema);

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.json({ message: 'Account Created Successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'User already exists!' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials!' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});

app.get('/menu', async (req, res) => {
    const menu = await Menu.find();
    res.json(menu);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
