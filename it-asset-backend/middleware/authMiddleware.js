const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
require('dotenv').config();

// Middleware สำหรับตรวจสอบ Token (ต้อง Login ก่อน)
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // นำข้อมูล user ที่ login อยู่ไปใส่ใน req object เพื่อใช้ต่อ
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] },
                include: [{ model: Role, attributes: ['name']}]
            });

            next(); // ไปยังด่านต่อไป
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware สำหรับตรวจสอบ Role (เช่น ต้องเป็น admin เท่านั้น)
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.Role.name)) {
            return res.status(403).json({ message: `User role ${req.user.Role.name} is not authorized to access this route` });
        }
        next();
    };
};