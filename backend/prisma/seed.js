const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin', 10);

  await prisma.employeeDetails.upsert({
    where: { Email: 'admin@admin.com' },
    update: {},
    create: {
      Email: 'admin@admin.com',
      Password: adminPassword,
      Role: 'admin',
    },
  });

  console.log('Admin user created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
