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
  console.log("Editando configurações da loja")

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

export const createDefaultConfig = async (req: Request, res: Response) => {
  console.log("Criando configurações padrões da loja")
  try {
    // Apaga todas as configurações existentes
    await prisma.config.deleteMany();
    // Verifica se já existe uma configuração padrão
    const existingDefaultConfig = await prisma.config.findFirst({
      where: { storeName: null }, // Adapte conforme seus critérios para identificar uma configuração padrão
    });

    if (existingDefaultConfig) {
      return res.status(400).json({ error: 'Configuração padrão já existe.' });
    }

    // Cria a configuração padrão
    const defaultConfig = await prisma.config.create({
      data: {
        storeName: 'Afiliado Store', 
        storeDescription: "Sua loja para produtos de afiliados",
        storeLogo: '/logo.png', 
        storeContact: JSON.parse('{"address": "Rua Exemplo, 00 - Natal - Rio Grande do Norte", "phone": "+55 84 99999-9999", "email": "example@example.com", "socialWhatApp":"https://", "socialTelegram":"https://", "socialFacebook":"https://", "socialTwitter":"https://", "socialInstagram":"https://"}'), 
        storeConfig: JSON.parse('{"navbar": "logo-and-name"}'), 
      },
    });

    res.status(201).json(defaultConfig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar configuração padrão.' });
  } finally {
    await prisma.$disconnect();
  }
};