import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateCustomId } from '../lib/utils';



const prisma = new PrismaClient();

async function isIdUnique(id: string) {
  try {
    const existingProduct = await prisma.products.findUnique({
      where: {
        customId: id,
      },
    });
    // Se existingProduct for null, o ID é único; caso contrário, não é único
    return !existingProduct;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
      let customId;
      do {
        customId = generateCustomId();
      } while (!(await isIdUnique(customId)));
      const newProduct = await prisma.products.create({
        data: { ...req.body,
        customId: customId },
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export const editProduct = async (req: Request, res: Response) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await prisma.products.update({
        where: { customId: productId },
        data: { ...req.body },
      });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    } finally {
      await prisma.$disconnect();
    }
  };

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
};
  
  export const getProductsByName = async (req: Request, res: Response) => {
    try {
      const products = await prisma.products.findMany({
        where: {
          title: {
            contains: req.params.name,
            mode: 'insensitive', // case-insensitive search
          },
        },
      });
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export const deleteProductById = async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id;
  
      const deletedProduct = await prisma.products.delete({
        where: { customId: idToDelete },
      });
  
      res.status(200).json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  export const getProductById = async (req: Request, res: Response) => {
    try {
      const idToGet = req.params.id;
  
      const byIdProduct = await prisma.products.findUnique({
        where: { customId: idToGet },
      });
  
      res.status(200).json(byIdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    } finally {
      await prisma.$disconnect();
    }
  };