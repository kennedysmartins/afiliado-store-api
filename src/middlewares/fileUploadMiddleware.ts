import multer from "multer";
import path from "path";
import fs from "fs";

// Verifique se o diretório 'uploads/' existe
const dir = './uploads';
if (!fs.existsSync(dir)) {
    // Se não existir, crie o diretório
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname)
        cb(null, fileName)
    },
})

const fileUpload = multer({storage})

export default fileUpload;