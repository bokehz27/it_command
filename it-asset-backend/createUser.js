// it-asset-backend/createUser.js

const { User, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  console.log('--- Starting Admin User Creation Script ---');
  
  try {
    const username = 'admin';
    const password = 'admin123';
    const role_id = 1;

    // ลบ user 'admin' เก่าออกก่อน เพื่อความแน่นอน
    await User.destroy({ where: { username: username } });
    console.log(`Removed any existing '${username}' user.`);

    // สร้าง hash ของรหัสผ่านด้วย library ในเครื่องของคุณเอง
    console.log(`Hashing password for '${username}'...`);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // สร้าง user ใหม่ด้วยข้อมูลที่ถูกต้อง
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      role_id: role_id
    });

    console.log('\n✅ SUCCESS! Admin user created successfully:');
    console.log(JSON.stringify(newUser.toJSON(), null, 2));

  } catch (error) {
    console.error('\n❌ ERROR: Could not create admin user:', error);
  } finally {
    await sequelize.close(); // ปิดการเชื่อมต่อ DB
    console.log('\n--- Script finished ---');
  }
}

createAdmin();