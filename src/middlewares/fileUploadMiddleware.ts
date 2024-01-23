import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDirectory = 'uploads/';

// Verificar se o diretório de upload existe, senão, criá-lo
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const fileUpload = multer({ storage });

export default fileUpload;
