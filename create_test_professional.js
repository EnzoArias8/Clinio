const { PrismaClient } = require('@prisma/client');
const { PrismaAdapter } = require('@auth/prisma-adapter');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createTestProfessional() {
  let prisma;
  try {
    console.log('Connecting to database...');
    
    prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });

    await prisma.$connect();
    console.log('✅ Connected to database');

    // Check if test professional already exists
    const existingProfesional = await prisma.profesional.findUnique({
      where: { email: 'test@clinio.com' }
    });

    if (existingProfesional) {
      console.log('✅ Test professional already exists');
      console.log(`   Name: ${existingProfesional.nombre}`);
      console.log(`   Email: ${existingProfesional.email}`);
      console.log(`   Password: ${existingProfesional.password ? 'SET' : 'NOT SET'}`);
      return;
    }

    // Create test professional with password
    const hashedPassword = await bcrypt.hash('clinio123', 12);
    
    const profesional = await prisma.profesional.create({
      data: {
        nombre: 'Dr. Test Profesional',
        email: 'test@clinio.com',
        especialidad: 'Medicina General',
        password: hashedPassword,
        activo: true,
        user: {
          create: {
            email: 'test@clinio.com',
          },
        },
      },
    });

    console.log('✅ Test professional created successfully:');
    console.log(`   Name: ${profesional.nombre}`);
    console.log(`   Email: ${profesional.email}`);
    console.log(`   Password: clinio123`);
    console.log(`   Especialidad: ${profesional.especialidad}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
      console.log('Database connection closed');
    }
  }
}

createTestProfessional();
