import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import productRoutes from './routes/product.routes'
import mainRoutes from './routes/main.routes'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import cors from 'cors';
import swaggerUi from "swagger-ui-express"
require("dotenv").config();

const app = express()
const PORT = process.env.PORT;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
};

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.use(express.static('uploads'));

app.use("/", mainRoutes);
  
app.use('/products', productRoutes)
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./docs/swagger.json")));

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:'+PORT)
});