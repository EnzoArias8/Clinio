const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

async function addAuthSchema() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check if password field already exists
    const checkPasswordQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Profesional' 
      AND column_name = 'password'
    `;
    
    const passwordResult = await client.query(checkPasswordQuery);
    
    if (passwordResult.rows.length === 0) {
      // Add password field
      await client.query(`ALTER TABLE "Profesional" ADD COLUMN "password" TEXT NOT NULL DEFAULT ''`);
      console.log('✅ password field added to Profesional table');
    } else {
      console.log('ℹ️ password field already exists in Profesional table');
    }

    // Check if User table exists
    const checkUserTable = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'User'
    `;
    
    const userTableResult = await client.query(checkUserTable);
    
    if (userTableResult.rows.length === 0) {
      // Create User table
      await client.query(`
        CREATE TABLE "User" (
            "id" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "emailVerified" TIMESTAMP(3),
            "profesionalId" TEXT NOT NULL,
            CONSTRAINT "User_pkey" PRIMARY KEY ("id")
        )
      `);
      console.log('✅ User table created');
    } else {
      console.log('ℹ️ User table already exists');
    }

    // Check if Account table exists
    const checkAccountTable = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'Account'
    `;
    
    const accountTableResult = await client.query(checkAccountTable);
    
    if (accountTableResult.rows.length === 0) {
      // Create Account table
      await client.query(`
        CREATE TABLE "Account" (
            "id" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "provider" TEXT NOT NULL,
            "providerAccountId" TEXT NOT NULL,
            "refresh_token" TEXT,
            "access_token" TEXT,
            "expires_at" INTEGER,
            "token_type" TEXT,
            "scope" TEXT,
            "id_token" TEXT,
            "session_state" TEXT,
            CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
        )
      `);
      console.log('✅ Account table created');
    } else {
      console.log('ℹ️ Account table already exists');
    }

    // Check if Session table exists
    const checkSessionTable = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'Session'
    `;
    
    const sessionTableResult = await client.query(checkSessionTable);
    
    if (sessionTableResult.rows.length === 0) {
      // Create Session table
      await client.query(`
        CREATE TABLE "Session" (
            "id" TEXT NOT NULL,
            "sessionToken" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "expires" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
        )
      `);
      console.log('✅ Session table created');
    } else {
      console.log('ℹ️ Session table already exists');
    }

    // Check if VerificationToken table exists
    const checkVerificationTokenTable = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'VerificationToken'
    `;
    
    const verificationTokenTableResult = await client.query(checkVerificationTokenTable);
    
    if (verificationTokenTableResult.rows.length === 0) {
      // Create VerificationToken table
      await client.query(`
        CREATE TABLE "VerificationToken" (
            "identifier" TEXT NOT NULL,
            "token" TEXT NOT NULL,
            "expires" TIMESTAMP(3) NOT NULL
        )
      `);
      console.log('✅ VerificationToken table created');
    } else {
      console.log('ℹ️ VerificationToken table already exists');
    }

    // Add constraints if they don't exist
    try {
      await client.query(`ALTER TABLE "User" ADD CONSTRAINT "User_email_key" UNIQUE ("email")`);
      console.log('✅ User email constraint added');
    } catch (e) {
      console.log('ℹ️ User email constraint already exists');
    }

    try {
      await client.query(`ALTER TABLE "User" ADD CONSTRAINT "User_profesionalId_key" UNIQUE ("profesionalId")`);
      console.log('✅ User profesionalId constraint added');
    } catch (e) {
      console.log('ℹ️ User profesionalId constraint already exists');
    }

    try {
      await client.query(`ALTER TABLE "Session" ADD CONSTRAINT "Session_sessionToken_key" UNIQUE ("sessionToken")`);
      console.log('✅ Session sessionToken constraint added');
    } catch (e) {
      console.log('ℹ️ Session sessionToken constraint already exists');
    }

    try {
      await client.query(`ALTER TABLE "Account" ADD CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")`);
      console.log('✅ Account constraint added');
    } catch (e) {
      console.log('ℹ️ Account constraint already exists');
    }

    try {
      await client.query(`ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token")`);
      console.log('✅ VerificationToken constraint added');
    } catch (e) {
      console.log('ℹ️ VerificationToken constraint already exists');
    }

    console.log('✅ Auth schema setup completed successfully');

  } catch (error) {
    console.error('❌ Error setting up auth schema:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

addAuthSchema();
