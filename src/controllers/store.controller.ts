import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllConfigs = async (req: Request, res: Response) => {
  try {
    const configs = await prisma.config.findMany();
    res.status(200).json(configs);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const editConfig = async (req: Request, res: Response) => {
  const { id } = req.params; // Assume que você recebe o ID da configuração como parâmetro na URL
  const { storeName, storeLogo, storeAddress, storeContact, storeConfig } = req.body;

  try {
    // Verifica se a configuração existe
    const existingConfig = await prisma.config.findUnique({
      where: { id: String(id) },
    });

    if (!existingConfig) {
      return res.status(404).json({ error: 'Configuração não encontrada.' });
    }

    // Atualiza as colunas necessárias
    const updatedConfig = await prisma.config.update({
      where: { id: String(id) },
      data: {
        storeName,
        storeLogo,
        storeAddress,
        storeContact,
        storeConfig,
      },
    });

    res.status(200).json(updatedConfig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao editar a configuração.' });
  } finally {
    await prisma.$disconnect();
  }
};