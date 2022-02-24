const multer = require('multer');
const path = require('path');


//Multer Config
module.exports = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now()
                + path.extname(file.originalname))
        }
    }),
    limits: {
        fieldNameSize: 200,
        fileSize: 5 * 1024 * 1024,
    },
    
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error("File Type is Not supported"), false);
            return;
        }
        cb(null, true)
    }
});
