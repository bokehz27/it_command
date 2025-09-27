// it-asset-backend/controllers/userController.js

const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <<< เพิ่มบรรทัดนี้เข้ามา

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ['name'] }],
            attributes: { exclude: ['password'] } // Don't send password hash
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, password, role_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role_id
        });
        res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// --- START: เพิ่มฟังก์ชัน loginUser (เวอร์ชัน DEBUG) ---
exports.loginUser = async (req, res) => {
    // --- DEBUGGING ---
    console.log('--- Login attempt received ---');
    const { username, password } = req.body;
    console.log(`Attempting login for user: "${username}" with password: "${password}"`);

    try {
        // 1. ค้นหา user จาก username
        const user = await User.findOne({ 
            where: { username },
            include: [{ model: Role, attributes: ['name'] }] 
        });

        // --- DEBUGGING ---
        if (!user) {
            console.log('>>> DEBUG: User not found in database!');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log('>>> DEBUG: User found:', JSON.stringify(user, null, 2));


        // 2. เปรียบเทียบรหัสผ่านที่ส่งมากับในฐานข้อมูล
        const isMatch = await bcrypt.compare(password, user.password);

        // --- DEBUGGING ---
        console.log(`>>> DEBUG: Password comparison result (isMatch): ${isMatch}`);


        if (!isMatch) {
            console.log('>>> DEBUG: Password does not match.');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        console.log('>>> DEBUG: Login successful, creating token...');
        // --- END DEBUGGING ---

        // 3. ถ้าถูกต้อง ให้สร้าง Token
        const payload = {
            id: user.id,
            username: user.username,
            role: user.Role.name // เพิ่ม role เข้าไปใน token
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d' // Token มีอายุ 1 วัน
        });

        // 4. ส่ง Token กลับไปให้ผู้ใช้
        res.json({
            message: 'Logged in successfully',
            token: token
        });

    } catch (error) {
        console.error('>>> DEBUG: An error occurred during login process:', error);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};
// --- END: เพิ่มฟังก์ชัน loginUser ---