const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function checkAndUpdateProfesionales() {
  try {
    console.log('Connecting to database via Prisma...');

    // Check existing professionals
    const profesionales = await prisma.profesional.findMany({
      orderBy: { creadoEn: 'asc' }
    });

    console.log(`Found ${profesionales.length} professionals:`);
    
    for (const profesional of profesionales) {
      console.log(`- ${profesional.nombre} (${profesional.email}) - Password: ${profesional.password ? 'YES' : 'NO'}`);
      
      // If no password, set a default one
      if (!profesional.password) {
        const defaultPassword = 'clinio123'; // Default password for existing users
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
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed');
  }
}

checkAndUpdateProfesionales();
