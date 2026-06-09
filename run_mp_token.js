const { Client } = require('pg');
require('dotenv').config();

async function addMpTokenField() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check if column already exists
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Profesional' 
      AND column_name = 'mpAccessToken'
    `;
    
    const result = await client.query(checkQuery);
    
    if (result.rows.length === 0) {
      // Column doesn't exist, add it
      const addColumnQuery = `
        ALTER TABLE "Profesional" 
        ADD COLUMN "mpAccessToken" TEXT
      `;
      
      await client.query(addColumnQuery);
      console.log('✅ mpAccessToken field added successfully');
    } else {
      console.log('ℹ️ mpAccessToken field already exists');
    }

  } catch (error) {
    console.error('❌ Error adding mpAccessToken field:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

addMpTokenField();
