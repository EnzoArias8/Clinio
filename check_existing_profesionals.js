const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import Prisma singleton
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkAndUpdateProfesionales() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check existing professionals
    const result = await client.query(`
      SELECT id, email, nombre, password 
      FROM "Profesional" 
      ORDER BY "creadoEn" ASC
    `);

    console.log(`Found ${result.rows.length} professionals:`);
    
    for (const profesional of result.rows) {
      console.log(`- ${profesional.nombre} (${profesional.email}) - Password: ${profesional.password ? 'YES' : 'NO'}`);
      
      // If no password, set a default one
      if (!profesional.password) {
        const defaultPassword = 'clinio123'; // Default password for existing users
        const hashedPassword = await bcrypt.hash(defaultPassword, 12);
        
        await client.query(`
          UPDATE "Profesional" 
          SET password = $1 
          WHERE id = $2
        `, [hashedPassword, profesional.id]);
        
        console.log(`  -> Set default password: ${defaultPassword}`);
      }
    }

    console.log('✅ Professional check completed');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

checkAndUpdateProfesionales();
