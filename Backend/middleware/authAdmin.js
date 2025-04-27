const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authAdmin = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.adminToken;
        
        if (!token) {
            return res.redirect('/admin/login');
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.redirect('/admin/login');
        }
        
        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).render('error', { error: 'Access denied. Admin privileges required.' });
        }
        
        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        res.redirect('/admin/login');
    }
};

module.exports = authAdmin; 