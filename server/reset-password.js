import 'dotenv/config';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const email = process.argv[2] || process.env.ADMIN_EMAIL || 'hellosajid07@gmail.com';
const newPassword = process.argv[3];

if (!newPassword) {
  console.log('\n❌ Usage: node server/reset-password.js <email> <newPassword>');
  console.log('Example: node server/reset-password.js hellosajid07@gmail.com MyNewSecretPassword!\n');
  process.exit(1);
}

async function resetPassword() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'be4yougo'
    });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await conn.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

    if (result.affectedRows === 0) {
      console.log(`\n⚠️ No user found with email: ${email}\n`);
    } else {
      console.log(`\n✅ Password successfully updated for: ${email}\n`);
    }

    await conn.end();
  } catch (err) {
    console.error('\n❌ Failed to update password:', err.message, '\n');
    process.exit(1);
  }
}

resetPassword();
