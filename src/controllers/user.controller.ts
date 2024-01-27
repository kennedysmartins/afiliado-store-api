// controllers/user.controller.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import fileUpload from '../middlewares/fileUploadMiddleware';
require('dotenv').config();
import { User } from '../lib/types';

const prisma = new PrismaClient();
const saltRounds = 10;
const jsonSecret = process.env.JSON_SECRET as string;

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: { id: String(id) },
  });
  res.json(user);
};


export const createUser = async (req: Request, res: Response) => {
  console.log("Criando User");
  try {
    const users = await prisma.users.findMany();
    if (users.length > 0) {
      const { password, ...userDataWithoutPassword } = req.body; // Remove a senha dos dados do usuário
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await prisma.users.create({
        data: {
          ...userDataWithoutPassword, // Use os dados do usuário sem a senha
          passwordHash: hashedPassword,
        },
      });
      res.status(200).json(newUser);
    } else {

      //create first user
      const { password, ...userDataWithoutPassword } = req.body; // Remove a senha dos dados do usuário
      const hashedPassword = await bcrypt.hash(password, saltRounds);


      const newUser = await prisma.users.create({
        data: {
          ...userDataWithoutPassword, // Use os dados do usuário sem a senha
          passwordHash: hashedPassword,
          userType: 'SUPER',
          status: 'VERIFIED',
          username: userDataWithoutPassword.name.split(" ")[0].toLowerCase(),
        },
      });
      res.status(200).json(newUser);
    }
  } catch (error:any) {
    res.status(500).json(error.message);
  } finally {
    // desconectar o PrismaClient
    await prisma.$disconnect();
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const deletedUser = await prisma.users.delete({
      where: { id: idToDelete },
    });

    //res deleted user
    res.status(204).json(deletedUser);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    // desconectar o PrismaClient
    await prisma.$disconnect();
  }
};

export const authUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.users.findUnique({
        where: { email: email as string },
      });
  
      if (!user) {
        res.status(500).json({ error: "Usuário não encontrado" });
        return;
      }
  
      if (user.passwordHash) {
        const isPassValid = await bcrypt.compare(password, user.passwordHash);
  
        if (!isPassValid) {
          res.status(500).json({ error: "Senha não encontrada" });
          return;
        }
  
        const token = jwt.sign({ id: user.id }, jsonSecret as string, {
          expiresIn: "30m",
        });
  
        res.json({ token: token, user: user });
      } else {
        res.status(500).json({ error: "Senha não encontrada" });
      }
    } catch (error) {
      console.error("Erro durante a autenticação do usuário:", error);
      res.status(500).json({ error: "Erro durante a autenticação do usuário" });
    } finally {
      // desconectar o PrismaClient
        await prisma.$disconnect();
      }
  };

  export const editUser = async (req: Request, res: Response) => {
    try {
        fileUpload.single('image')(req, res, async (err: any) => {
      const userId = req.params.id;
      const { password, ...userDataWithoutPassword } = req.body;
  
      let updatedUserData: any;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        updatedUserData = await prisma.users.update({
          where: { id: userId },
          data: {
            ...userDataWithoutPassword,
            passwordHash: hashedPassword,
          },
          select: {
            // Selecionamos os campos que queremos retornar após a atualização
            id: true,
            name: true,
            username: true,
            passwordHash: true,
            email: true,
            status: true,
            imagePath: true,
            userType: true,
          },
        });
      } else {
        updatedUserData = await prisma.users.update({
          where: { id: userId },
          data: {
            ...userDataWithoutPassword,
          },
          select: {
            id: true,
            name: true,
            username: true,
            passwordHash: true,
            email: true,
            status: true,
            imagePath: true,
            userType: true,
          },
        });
      }
  
      res.status(200).json({
        message: `Usuário atualizado com sucesso`,
        user: updatedUserData,
      });
    });
    } catch (error) {
      res.status(500).json(error);
    } finally {
      // desconectar o PrismaClient
      await prisma.$disconnect();
    }
  };