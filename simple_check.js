const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function checkProfesionales() {
  let prisma;
  try {
    console.log('Connecting to database...');
    
    // Create Prisma client
    prisma = new PrismaClient();

    // Test connection
    await prisma.$connect();
    console.log('✅ Connected to database');

    // Check existing professionals
    const profesionales = await prisma.profesional.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        password: true,
        creadoEn: true
      }
    });

    console.log(`Found ${profesionales.length} professionals:`);
    
    for (const profesional of profesionales) {
      console.log(`- ${profesional.nombre} (${profesional.email}) - Password: ${profesional.password ? 'YES' : 'NO'}`);
      
      // If no password, set a default one
      if (!profesional.password) {
        const defaultPassword = 'clinio123';
        const hashedPassword = await bcrypt.hash(defaultPassword, 12);
        
        await prisma.profesional.update({
          where: { id: profesional.id },
          data: { password: hashedPassword }
        });
        
        console.log(`  -> Set default password: ${defaultPassword}`);
      }
    }

    console.log('✅ Professional check completed');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
      console.log('Database connection closed');
    }
  }
}

checkProfesionales();
