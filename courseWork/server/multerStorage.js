const multer  = require('multer');
const path    = require('path');

const uploadsDir = 'data/fs';
const uploadsFullPath = path.join(__dirname, uploadsDir);

// const storageConfig = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsFullPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     }
// });

const storage = multer({
    fileFilter: fileFilter });
    
    

function isImage(multerFile) {
    const fileExtension = getFileExtension(multerFile) || '';
    return (['png', 'jpg', 'jpeg'].includes(fileExtension));
}

function getFileExtension(file) {
    return file.mimetype.split('/')[1] || '';
}

function fileFilter (req, file, cb) {
    const isImg = isImage(file);
    cb(null, isImg);
}


module.exports = {storage, uploadsDir, uploadsFullPath, getFileExtension};