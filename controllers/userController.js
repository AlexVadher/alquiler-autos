const User = require('../models/User');

const register = async (req, res) => {
    try {
        const {walletAddress, name, email, password} = req.body;
        const user = new User({walletAddress, name, email, password});
        await user.save();
        res.status(201).json({success: true, user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user || user.password !== password) {
            return res.status(401).json({error: 'Credenciales inválidas'});
        }

        res.json({success: true, user});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {register, login};
