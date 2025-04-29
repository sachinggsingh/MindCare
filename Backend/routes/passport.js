const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/login'
}
), (req, res) => {
    // Generate token without using generateToken method
    const token = jwt.sign(
        { 
            _id: req.user._id,
            email: req.user.email,
            name: req.user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    });
    
    res.redirect('http://localhost:5173');
});

router.get('https://local:5173/login', (req, res) => {
    res.status(401).json({ message: 'Login failed' , error: 'Unauthorized' ,success: false});
})
router.get('https://local:5173', (req, res) => {
    res.status(200).json({ message: 'Login successful' , success: true});
    if (req.user) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
    token = req.user.token;
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    });
    res.redirect('http://localhost:5173');
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('http://localhost:5173');
    });
});

module.exports = router;
