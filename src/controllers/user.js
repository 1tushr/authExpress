const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const dotenv = require("dotenv")

dotenv.config()

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashpass = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.create({
            name,
            email,
            password: hashpass,
        });
        console.log("User created successfully:", newUser);
        res.json(newUser);
    } catch (error) {
        console.error("Failed to create user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        let matchUser = await User.findOne({ email });

        if (!matchUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!(await bcrypt.compare(password, matchUser.password))) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token= jwt.sign({user : {id: matchUser._id}},process.env.SECRET_TOKEN,{expiresIn: process.env.EXPIRY_TIME})
        const userObject = matchUser.toObject();
        delete userObject.password;

        res.json({ message: "User authentication success", user: userObject, token});
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


function handleShowProfile (req,res){
    try {
        res.json({message:"this is the user profle after the auth"})
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error at profile" });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleShowProfile
};
