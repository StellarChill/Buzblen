const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getUsers: async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  },
  createUser: async (req, res) => {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.json(newUser);
  },
};